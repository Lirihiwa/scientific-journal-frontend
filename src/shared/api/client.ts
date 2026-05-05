// src/shared/api/client.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from './tokens';

// Очередь для запросов, которые ждут обновления токена
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> =[];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue =[];
};

export const apiClient = axios.create({
    // Используем переменную окружения Vite (никакого хардкода)
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8088/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 1. Интерцептор Запроса (Добавляем токен)
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenStorage.getAccess();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Интерцептор Ответа (Обработка 401 и Refresh)
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            if (isRefreshing) {
                // Если уже обновляем, ставим запрос в очередь
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = tokenStorage.getRefresh();

            if (!refreshToken) {
                tokenStorage.clear();
                window.location.href = '/login'; // Жесткий редирект, если нет рефреша
                return Promise.reject(error);
            }

            try {
                // Прямой запрос через axios (не apiClient!), чтобы не попасть в бесконечный цикл
                const { data } = await axios.post<{ tokens: { access_token: string; refresh_token: string } }>(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    { refresh_token: refreshToken }
                );

                const { access_token, refresh_token } = data.tokens;
                tokenStorage.setTokens(access_token, refresh_token);

                // Обновляем токен в заголовоках упавшего запроса
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                // Прогоняем очередь накопившихся запросов
                processQueue(null, access_token);

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                tokenStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8088/api',
});

// 1. Подставляем токен в каждый запрос
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Обработка 401 ошибки (Refresh Token logic)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    // Вызываем auth-service для обновления пары токенов
                    const { data } = await axios.post('http://localhost:8088/api/auth/refresh', {
                        refresh_token: refreshToken
                    });

                    localStorage.setItem('access_token', data.tokens.access_token);
                    localStorage.setItem('refresh_token', data.tokens.refresh_token);

                    originalRequest.headers.Authorization = `Bearer ${data.tokens.access_token}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
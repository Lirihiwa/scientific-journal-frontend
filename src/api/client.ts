import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8088/api', // Твой Traefik порт
    headers: {
        'Content-Type': 'application/json',
    },
});

// Перехватчик для добавления JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Перехватчик для обработки ошибок (например, 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            // Можно добавить редирект на логин
        }
        return Promise.reject(error);
    }
);

export default api;
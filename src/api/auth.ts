// src/api/auth.ts
import api from './client';
import type {AuthResult, User} from '../types/auth';

export const authApi = {
    login: (data: any) => api.post<AuthResult>('/auth/login', data),
    register: (data: any) => api.post<AuthResult>('/auth/register', data),
    getMe: () => api.get<User>('/auth/me'),
    refresh: (token: string) => api.post<AuthResult>('/auth/refresh', { refresh_token: token }),
};
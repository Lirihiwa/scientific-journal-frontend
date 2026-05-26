import { apiClient } from '../../api/client';
import type { AuthResult, User, LoginFormData, RegisterFormData } from './auth.types';

export const authApi = {
    login: async (data: LoginFormData) => {
        const response = await apiClient.post<AuthResult>('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterFormData) => {
        const response = await apiClient.post<AuthResult>('/auth/register', data);
        return response.data;
    },

    getMe: async () => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    }
};
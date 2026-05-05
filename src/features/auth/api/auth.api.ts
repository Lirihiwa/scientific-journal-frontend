// src/features/auth/api/auth.api.ts
import { apiClient } from '../../../shared/api/client';
import type { AuthResult, User } from '../../../entities/user/model/types';
import type { LoginFormData, RegisterFormData } from '../model/schemas'; // Это мы создадим на этапе форм

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
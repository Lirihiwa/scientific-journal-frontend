import { create } from 'zustand';
import { tokenStorage } from '../api/tokens';
import { authApi } from '../features/auth/auth.api.ts';
import type { User } from '../features/auth/auth.types.ts';

interface SessionState {
    user: User | null;
    isAuthLoading: boolean;

    // Actions
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    isAuthLoading: true,

    login: async (accessToken, refreshToken) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        try {
            const user = await authApi.getMe();
            set({ user, isAuthLoading: false });
        } catch (error) {
            tokenStorage.clear();
            set({ user: null, isAuthLoading: false });
            throw error;
        }
    },

    logout: () => {
        tokenStorage.clear();
        set({ user: null });
        window.location.href = '/login'; // Жесткий сброс состояния приложения
    },

    checkAuth: async () => {
        const token = tokenStorage.getAccess();
        if (!token) {
            set({ user: null, isAuthLoading: false });
            return;
        }

        try {
            const user = await authApi.getMe();
            set({ user, isAuthLoading: false });
        } catch (error) {
            tokenStorage.clear();
            set({ user: null, isAuthLoading: false });
        }
    }
}));
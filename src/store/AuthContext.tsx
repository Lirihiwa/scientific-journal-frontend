import { createContext, useState, useEffect, type ReactNode, useCallback, useMemo } from 'react';
import type { User } from '../types/auth';
import { authApi } from '../api/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => void;
}

// Экспортируем только для внутреннего использования в хуке
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    }, []);

    const fetchProfile = useCallback(async () => {
        try {
            // Убираем setLoading(true) отсюда, чтобы не вызывать "каскадный рендер"
            const { data } = await authApi.getMe();
            setUser(data);
        } catch (error) {
            logout();
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Вызываем асинхронно
            // eslint-disable-next-line react-hooks/set-state-in-effect
            void fetchProfile();
        } else {
            setLoading(false);
        }
    }, [fetchProfile]);

    const login = useCallback(async (accessToken: string, refreshToken: string) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        await fetchProfile();
    }, [fetchProfile]);

    // Оптимизируем значение контекста
    const value = useMemo(() => ({
        user,
        loading,
        login,
        logout
    }), [user, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
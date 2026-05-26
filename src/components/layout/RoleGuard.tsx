import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSessionStore } from '../../stores/session.store';
import type { RoleCode } from '../../entities/user/model/types';
import React from "react";

interface RoleGuardProps {
    children: React.ReactNode;
    roles?: RoleCode[]; // Если роли не переданы, просто проверяем авторизацию
}

export const RoleGuard = ({ children, roles }: RoleGuardProps) => {
    const { user, isAuthLoading } = useSessionStore();
    const location = useLocation();

    // 1. Ждем проверку сессии
    if (isAuthLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                    Проверка доступа...
                </p>
            </div>
        );
    }

    // 2. Пользователь не авторизован -> отправляем на логин
    if (!user) {
        // Сохраняем URL, куда хотел попасть юзер, чтобы вернуть его после входа
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. У пользователя нет нужной роли -> отправляем на главную
    if (roles && !roles.includes(user.role_code)) {
        return <Navigate to="/" replace />;
    }

    // 4. Доступ разрешен
    return <>{children}</>;
};
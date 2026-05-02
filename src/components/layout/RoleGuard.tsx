// src/components/layout/RoleGuard.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.ts";
import type { RoleCode } from '../../types/auth';

interface RoleGuardProps {
    children: React.ReactNode;
    roles: RoleCode[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, roles }) => {
    const { user, loading } = useAuth(); // Теперь TS видит loading!

    if (loading) {
        return (
            <div className="p-20 text-center font-accent text-[10px] uppercase tracking-widest text-muted">
                Проверка доступа... {/* // LOC common.checking_access */}
            </div>
        );
    }

    if (!user || !roles.includes(user.role_code)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
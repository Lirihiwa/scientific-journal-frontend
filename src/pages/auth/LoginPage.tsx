// src/pages/auth/LoginPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { Input } from '../../components/ui/Input.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { loginSchema, type LoginFormData } from '../../features/auth/model/schemas';
import { authApi } from '../../features/auth/api/auth.api';
import { useSessionStore } from '../../entities/session/model/store';
import { Card } from '../../components/ui/Card.tsx';
import { PageHeader } from '../../components/ui/PageHeader.tsx';
import { PageContainer } from "../../components/ui/PageContainer.tsx";

export const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();
    const { login: setSession } = useSessionStore();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: async (data) => {
            await setSession(data.tokens.access_token, data.tokens.refresh_token);
            toast.success(isRu ? "Успешный вход в систему" : "Successfully logged in");
            navigate('/submissions', { replace: true });
        },
        onError: () => {
            toast.error(isRu ? "Неверный логин или пароль" : "Invalid email or password");
        }
    });

    return (
        <PageContainer className="flex flex-col justify-center items-center w-full">
            <Card variant="accent" padding="lg" className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                        <ShieldCheck size={28} />
                    </div>
                    <PageHeader
                        title={t('auth.login_title')}
                        subtitle="Scientific Journal Identity"
                        withBorder={false}
                        className="items-center text-center"
                    />
                </div>

                <form onSubmit={handleSubmit(data => loginMutation.mutate(data))} className="space-y-6">
                    <Input
                        label={t('auth.email')}
                        type="email"
                        icon={<Mail size={16} />}
                        placeholder="author@csu.ru"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label={t('auth.password')}
                        type="password"
                        icon={<Lock size={16} />}
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-4"
                        size="lg"
                        isLoading={loginMutation.isPending}
                    >
                        {t('auth.login_action')}
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground font-medium">
                        {t('auth.no_account')}
                        <Link
                            to="/register"
                            className="text-primary font-bold ml-2 hover:underline tracking-tight transition-colors"
                        >
                            {t('auth.register_action')}
                        </Link>
                    </p>
                </div>
            </Card>
        </PageContainer>
    );
};
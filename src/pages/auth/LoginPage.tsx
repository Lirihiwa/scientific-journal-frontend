import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { FormInput } from '../../components/ui/FormInput';
import { Button } from '../../components/ui/Button';
import { loginSchema, type LoginFormData } from '../../features/auth/auth.types';
import { authApi } from '../../features/auth/auth.api';
import { useSessionStore } from '../../stores/session.store';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { PageContainer } from "../../components/ui/PageContainer";

export const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();
    const { login: setSession } = useSessionStore();

    const methods = useForm<LoginFormData>({
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
        <PageContainer className="min-h-[75vh] flex flex-col justify-center items-center w-full">
            <Card variant="accent" padding="none" className="w-full max-w-md p-6 sm:p-8 md:p-10">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <ShieldCheck size={24} />
                    </div>
                    <PageHeader
                        title={t('auth.login_title')}
                        subtitle="Scientific Journal Identity"
                        withBorder={false}
                        className="items-center text-center pb-0"
                    />
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(data => loginMutation.mutate(data))} className="space-y-5">
                        <FormInput
                            name="email"
                            label={t('auth.email')}
                            type="email"
                            icon={<Mail size={16} />}
                            placeholder="author@csu.ru"
                        />

                        <FormInput
                            name="password"
                            label={t('auth.password')}
                            type="password"
                            icon={<Lock size={16} />}
                            placeholder="••••••••"
                        />

                        <Button
                            type="submit"
                            className="w-full mt-2"
                            size="lg"
                            isLoading={loginMutation.isPending}
                        >
                            {t('auth.login_action')}
                        </Button>
                    </form>
                </FormProvider>

                <div className="mt-6 text-center border-t border-border pt-4">
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
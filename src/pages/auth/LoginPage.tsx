import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { FormInput } from '../../components/ui/FormInput';
import { Button } from '../../components/ui/Button';
import { loginSchema, type LoginFormData } from '../../features/auth/auth.types';
import { authApi } from '../../features/auth/auth.api';
import { useSessionStore } from '../../stores/session.store';
import { Card } from '../../components/ui/Card';
// import { PageHeader } from '../../components/ui/PageHeader';
// import { PageContainer } from "../../components/ui/PageContainer";

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
        <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
            <Card variant="default" className="w-full max-w-[400px] shadow-xl border-border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-heading font-bold mb-2">{t('auth.login_title')}</h1>
                    {/*<p className="text-[10px] font-accent uppercase tracking-widest text-muted-foreground">*/}
                    {/*    Scientific Journal Identity*/}
                    {/*</p>*/}
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(data => loginMutation.mutate(data))} className="space-y-4">
                        <FormInput name="email" label={t('auth.email')} type="email" placeholder="email@example.com" />
                        <FormInput name="password" label={t('auth.password')} type="password" placeholder="••••••••" />

                        <Button type="submit" className="w-full mt-4" size="lg" isLoading={loginMutation.isPending}>
                            {t('auth.login_action')}
                        </Button>
                    </form>
                </FormProvider>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                    {t('auth.no_account')} {' '}
                    <Link to="/register" className="text-primary font-bold hover:underline">
                        {t('auth.register_action')}
                    </Link>
                </div>
            </Card>
        </div>
    );
};
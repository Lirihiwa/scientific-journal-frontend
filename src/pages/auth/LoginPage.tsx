// src/pages/auth/LoginPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import { loginSchema, type LoginFormData } from '../../features/auth/model/schemas';
import { authApi } from '../../features/auth/api/auth.api';
import { useSessionStore } from '../../entities/session/model/store';
import { Card } from '../../shared/ui/Card';
import { PageHeader } from '../../shared/ui/PageHeader';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login: setSession } = useSessionStore();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: async (data) => {
            await setSession(data.tokens.access_token, data.tokens.refresh_token);
            toast.success("Успешный вход в систему");
            navigate('/submissions', { replace: true });
        },
        onError: () => toast.error("Неверный логин или пароль")
    });

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
            <Card variant="accent" padding="lg" className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6"><ShieldCheck size={28} /></div>
                    <PageHeader title="Вход в систему" subtitle="Scientific Journal Identity" className="border-0 pb-0 mb-0" />
                </div>

                <form onSubmit={handleSubmit(data => loginMutation.mutate(data))} className="space-y-6">
                    <Input label="Электронная почта" type="email" icon={<Mail size={16} />} placeholder="author@csu.ru" error={errors.email?.message} {...register('email')} />
                    <Input label="Пароль" type="password" icon={<Lock size={16} />} placeholder="••••••••" error={errors.password?.message} {...register('password')} />
                    <Button type="submit" className="w-full mt-4" size="lg" isLoading={loginMutation.isPending}>Войти в кабинет</Button>
                </form>

                <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground font-medium">
                        У вас еще нет профиля?
                        <Link to="/register" className="text-primary font-bold ml-2 hover:underline tracking-tight transition-colors">Зарегистрироваться</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};
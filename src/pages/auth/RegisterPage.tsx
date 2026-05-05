// src/pages/auth/RegisterPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UserPlus, Mail, Lock, User, Building, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import { registerSchema, type RegisterFormData } from '../../features/auth/model/schemas';
import { authApi } from '../../features/auth/api/auth.api';
import { Card } from '../../shared/ui/Card';
import { PageHeader } from '../../shared/ui/PageHeader';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            toast.success("Регистрация завершена. Теперь вы можете войти.");
            navigate('/login');
        },
        onError: (err: any) => {
            const isConflict = err.response?.status === 409;
            toast.error(isConflict ? "Указанный Email уже занят" : "Произошла ошибка регистрации");
        }
    });

    const onSubmit = (data: RegisterFormData) => {
        const cleanedData = {
            ...data,
            middle_name: data.middle_name || null,
            organization: data.organization || null,
            country: data.country || null,
        };
        registerMutation.mutate(cleanedData as RegisterFormData);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 animate-fade-in">
            <Card variant="accent" padding="lg" className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <PageHeader title="Регистрация автора" subtitle="Scientific Community" className="border-0 pb-0 mb-0" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border-b border-border pb-8">
                        <Input label="Email (Логин) *" type="email" icon={<Mail size={16} />} placeholder="author@csu.ru" error={errors.email?.message} {...register('email')} />
                        <Input label="Пароль *" type="password" icon={<Lock size={16} />} placeholder="Минимум 8 символов" error={errors.password?.message} {...register('password')} />
                    </div>

                    <Input label="Имя *" icon={<User size={16} />} error={errors.first_name?.message} {...register('first_name')} />
                    <Input label="Фамилия *" icon={<User size={16} />} error={errors.last_name?.message} {...register('last_name')} />
                    <Input label="Отчество" placeholder="Если есть" error={errors.middle_name?.message} {...register('middle_name')} />
                    <Input label="Страна" icon={<Globe size={16} />} placeholder="Например, Россия" error={errors.country?.message} {...register('country')} />

                    <div className="md:col-span-2">
                        <Input label="Организация / Университет" icon={<Building size={16} />} placeholder="Например, Челябинский государственный университет" error={errors.organization?.message} {...register('organization')} />
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <Button type="submit" className="w-full" size="lg" isLoading={registerMutation.isPending}>
                            <UserPlus size={18} className="mr-2" /> Создать учетную запись
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground">
                        Уже есть аккаунт?
                        <Link to="/login" className="text-primary font-bold ml-2 hover:underline transition-colors">Войти</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};
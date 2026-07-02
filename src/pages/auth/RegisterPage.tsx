import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
// import { UserPlus, Mail, Lock, User, Building, Globe } from 'lucide-react';
import { toast } from 'sonner';

import { FormInput } from '../../components/ui/FormInput';
import { Button } from '../../components/ui/Button';
import { registerSchema, type RegisterFormData } from '../../features/auth/auth.types';
import { authApi } from '../../features/auth/auth.api';
import { Card } from '../../components/ui/Card';
// import { PageHeader } from '../../components/ui/PageHeader';
import type { AxiosError } from "axios";
import type { ApiError } from "../../api/types";
// import { PageContainer } from "../../components/ui/PageContainer";

export const RegisterPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();

    const methods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            toast.success(isRu
                ? "Регистрация завершена. Теперь вы можете войти."
                : "Registration complete. You can now log in.");
            navigate('/login');
        },
        onError: (err: AxiosError<ApiError>) => {
            const isConflict = err.response?.status === 409;
            if (isConflict) {
                toast.error(isRu ? "Указанный Email уже занят" : "This email is already registered");
            } else {
                toast.error(isRu ? "Произошла ошибка регистрации" : "Registration failed");
            }
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
        // Используем h-full flex items-center justify-center, чтобы форма встала строго по центру Main
        <div className="h-full w-full flex items-center justify-center p-4">
            <Card variant="default" className="w-full max-w-[600px] shadow-sm border border-border p-8">
                <h2 className="text-2xl font-heading font-bold mb-8 text-center">{t('auth.register_title')}</h2>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput name="first_name" label={t('auth.first_name')} placeholder={isRu ? "Иван" : "John"} />
                            <FormInput name="last_name" label={t('auth.last_name')} placeholder={isRu ? "Иванов" : "Doe"} />
                        </div>

                        <FormInput name="email" label={t('auth.email')} placeholder="example@csu.ru" />
                        <FormInput name="password" label={t('auth.password')} type="password" placeholder={isRu ? "Минимум 8 символов" : "Min. 8 characters"} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput name="country" label={t('auth.country')} placeholder={isRu ? "Россия" : "Russia"} />
                            <FormInput name="organization" label={t('auth.organization')} placeholder={isRu ? "ЧелГУ" : "University Name"} />
                        </div>

                        <Button type="submit" className="w-full mt-6" size="lg" isLoading={registerMutation.isPending}>
                            {t('auth.register_action')}
                        </Button>
                    </form>
                </FormProvider>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    {t('auth.have_account')} <Link to="/login" className="text-primary font-bold hover:underline">{t('auth.login_action')}</Link>
                </p>
            </Card>
        </div>
    );
};
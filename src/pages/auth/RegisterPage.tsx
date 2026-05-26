import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, User, Building, Globe } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { registerSchema, type RegisterFormData } from '../../features/auth/auth.types';
import { authApi } from '../../features/auth/auth.api';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import type { AxiosError } from "axios";
import type { ApiError } from "../../api/types";
import { PageContainer } from "../../components/ui/PageContainer";

export const RegisterPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
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
        <PageContainer className="flex flex-col justify-center items-center w-full">
            <Card variant="accent" padding="lg" className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <PageHeader
                        title={t('auth.register_title')}
                        subtitle="Scientific Journal Identity"
                        withBorder={false}
                        className="items-center text-center"
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border-b border-border pb-8">
                        <Input
                            label={`${t('auth.email')} *`}
                            type="email"
                            icon={<Mail size={16} />}
                            placeholder="author@csu.ru"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                        <Input
                            label={`${t('auth.password')} *`}
                            type="password"
                            icon={<Lock size={16} />}
                            placeholder={isRu ? "Минимум 8 символов" : "Min. 8 characters"}
                            error={errors.password?.message}
                            {...register('password')}
                        />
                    </div>

                    <Input
                        label={`${t('auth.first_name')} *`}
                        icon={<User size={16} />}
                        error={errors.first_name?.message}
                        {...register('first_name')}
                    />
                    <Input
                        label={`${t('auth.last_name')} *`}
                        icon={<User size={16} />}
                        error={errors.last_name?.message}
                        {...register('last_name')}
                    />
                    <Input
                        label={t('auth.middle_name')}
                        placeholder={isRu ? "Если есть" : "Optional"}
                        error={errors.middle_name?.message}
                        {...register('middle_name')}
                    />
                    <Input
                        label={t('auth.country')}
                        icon={<Globe size={16} />}
                        placeholder={isRu ? "Например, Россия" : "e.g. Kazakhstan"}
                        error={errors.country?.message}
                        {...register('country')}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label={t('auth.organization')}
                            icon={<Building size={16} />}
                            placeholder={isRu ? "Например, ЧелГУ" : "University or Company name"}
                            error={errors.organization?.message}
                            {...register('organization')}
                        />
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={registerMutation.isPending}
                        >
                            <UserPlus size={18} className="mr-2" />
                            {t('auth.register_action')}
                        </Button>
                    </div>
                </form>

                <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground">
                        {t('auth.have_account')}
                        <Link to="/login" className="text-primary font-bold ml-2 hover:underline transition-colors">
                            {t('auth.login_action')}
                        </Link>
                    </p>
                </div>
            </Card>
        </PageContainer>
    );
};
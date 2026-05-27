import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, User, Building, Globe } from 'lucide-react';
import { toast } from 'sonner';

import { FormInput } from '../../components/ui/FormInput';
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

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border-b border-border pb-8">
                            <FormInput
                                name="email"
                                label={`${t('auth.email')} *`}
                                type="email"
                                icon={<Mail size={16} />}
                                placeholder="author@csu.ru"
                            />
                            <FormInput
                                name="password"
                                label={`${t('auth.password')} *`}
                                type="password"
                                icon={<Lock size={16} />}
                                placeholder={isRu ? "Минимум 8 символов" : "Min. 8 characters"}
                            />
                        </div>

                        <FormInput
                            name="first_name"
                            label={`${t('auth.first_name')} *`}
                            icon={<User size={16} />}
                        />
                        <FormInput
                            name="last_name"
                            label={`${t('auth.last_name')} *`}
                            icon={<User size={16} />}
                        />
                        <FormInput
                            name="middle_name"
                            label={t('auth.middle_name')}
                            placeholder={isRu ? "Если есть" : "Optional"}
                        />
                        <FormInput
                            name="country"
                            label={t('auth.country')}
                            icon={<Globe size={16} />}
                            placeholder={isRu ? "Например, Россия" : "e.g. Kazakhstan"}
                        />

                        <div className="md:col-span-2">
                            <FormInput
                                name="organization"
                                label={t('auth.organization')}
                                icon={<Building size={16} />}
                                placeholder={isRu ? "Например, ЧелГУ" : "University or Company name"}
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
                </FormProvider>

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
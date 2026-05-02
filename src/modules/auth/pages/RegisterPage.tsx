import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Building, MapPin } from 'lucide-react';
import { authApi } from '../../../api/auth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const RegisterPage = () => {
    const navigate = useNavigate();

    // Типизация формы на основе полей RegisterRequest бэкенда
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await authApi.register({
                ...data,
                // Очищаем пустые строки, чтобы бэкенд получил null, если поле не заполнено
                middle_name: data.middle_name || null,
                organization: data.organization || null,
                country: data.country || null,
            });

            // После успешной регистрации перекидываем на логин
            navigate('/login');
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError('email', { message: 'Пользователь уже существует' }); // // LOC auth.error.exists
            } else {
                setError('root', { message: 'Ошибка регистрации' }); // // LOC auth.error.generic
            }
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-12 px-4">
            <div className="bg-white w-full max-w-2xl shadow-card border-t-4 border-primary p-8 md:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading uppercase tracking-tight">
                        Регистрация автора {/* // LOC auth.register.title */}
                    </h1>
                    <p className="text-semi-transparent mt-2 italic text-sm">
                        Присоединяйтесь к научному сообществу ЧелГУ {/* // LOC auth.register.subtitle */}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {errors.root && (
                        <div className="md:col-span-2 bg-red-50 text-red-700 p-4 text-xs border-l-4 border-red-700 font-bold">
                            {errors.root.message}
                        </div>
                    )}

                    {/* Основные данные (на всю ширину) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-3 top-9 text-muted z-10" size={16} />
                            <Input
                                label="Email *" // // LOC auth.fields.email
                                {...register('email', { required: 'Email обязателен' })} // // LOC auth.validation.email_req
                                type="email"
                                placeholder="author@csu.ru"
                                className="pl-10"
                                error={errors.email?.message as string}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-9 text-muted z-10" size={16} />
                            <Input
                                label="Пароль *" // // LOC auth.fields.password
                                {...register('password', {
                                    required: 'Пароль обязателен', // // LOC auth.validation.pass_req
                                    minLength: { value: 8, message: 'Минимум 8 символов' } // // LOC auth.validation.pass_min
                                })}
                                type="password"
                                className="pl-10"
                                error={errors.password?.message as string}
                            />
                        </div>
                    </div>

                    {/* ФИО (в две колонки) */}
                    <div className="relative">
                        <User className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Имя *" // // LOC auth.fields.first_name
                            {...register('first_name', { required: true })}
                            className="pl-10"
                            error={errors.first_name ? 'Обязательно' : ''} // // LOC auth.validation.required
                        />
                    </div>

                    <div className="relative">
                        <User className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Фамилия *" // // LOC auth.fields.last_name
                            {...register('last_name', { required: true })}
                            className="pl-10"
                            error={errors.last_name ? 'Обязательно' : ''} // // LOC auth.validation.required
                        />
                    </div>

                    <div className="md:col-span-1">
                        <Input
                            label="Отчество" // // LOC auth.fields.middle_name
                            {...register('middle_name')}
                        />
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Страна" // // LOC auth.fields.country
                            {...register('country')}
                            placeholder="Russia"
                            className="pl-10"
                        />
                    </div>

                    {/* Организация (на всю ширину) */}
                    <div className="md:col-span-2 relative">
                        <Building className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Организация" // // LOC auth.fields.organization
                            {...register('organization')}
                            placeholder="Chelyabinsk State University"
                            className="pl-10"
                        />
                    </div>

                    {/* Кнопка отправки */}
                    <div className="md:col-span-2 mt-6">
                        <Button
                            type="submit"
                            className="w-full py-4 text-sm"
                            isLoading={isSubmitting}
                        >
                            <UserPlus size={18} />
                            Зарегистрироваться {/* // LOC auth.register.submit */}
                        </Button>
                    </div>
                </form>

                <div className="mt-10 text-center border-t border-border pt-8">
                    <p className="text-sm text-muted-foreground">
                        Уже зарегистрированы? {/* // LOC auth.register.already_have_account */}
                        <Link to="/login" className="text-primary font-bold ml-2 hover:underline tracking-tight">
                            Войти в кабинет {/* // LOC auth.register.go_to_login */}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
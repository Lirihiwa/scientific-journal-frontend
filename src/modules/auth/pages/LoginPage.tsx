import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';
import { authApi } from '../../../api/auth.ts';
import { Button } from '../../../components/ui/Button.tsx';
import { Input } from '../../../components/ui/Input.tsx';
import {useAuth} from "../../../hooks/useAuth.ts";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();
    const { login } = useAuth(); // Берем метод из контекста

    const onSubmit = async (data: any) => {
        try {
            const response = await authApi.login(data);
            // Вызываем метод контекста, который сохранит токены и загрузит профиль
            await login(response.data.tokens.access_token, response.data.tokens.refresh_token);
            navigate('/submissions');
        } catch (err: any) {
            setError('root', { message: 'Неверный логин или пароль' });
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md shadow-card border-t-4 border-primary p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-heading uppercase tracking-tight">
                        Вход в систему {/* // LOC auth.login.title */}
                    </h1>
                    <p className="text-semi-transparent text-sm mt-1">
                        Для авторов и редакторов {/* // LOC auth.login.subtitle */}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {errors.root && (
                        <div className="bg-red-50 text-red-700 p-3 text-xs border-l-4 border-red-700">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Email" // // LOC auth.fields.email
                            {...register('email', { required: true })}
                            type="email"
                            placeholder="author@csu.ru"
                            className="pl-10"
                            error={errors.email ? 'Email is required' : ''} // // LOC auth.validation.email
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-9 text-muted z-10" size={16} />
                        <Input
                            label="Пароль" // // LOC auth.fields.password
                            {...register('password', { required: true })}
                            type="password"
                            className="pl-10"
                            error={errors.password ? 'Password is required' : ''} // // LOC auth.validation.password
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4" isLoading={isSubmitting}>
                        <LogIn size={16} />
                        Войти {/* // LOC auth.login.submit */}
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">
                        Нет аккаунта? {/* // LOC auth.login.no_account */}
                        <Link to="/register" className="text-primary font-bold ml-2 hover:underline">
                            Регистрация {/* // LOC auth.login.go_to_register */}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
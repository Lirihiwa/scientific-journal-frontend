import { useAuth } from '../../../hooks/useAuth';
import { User, Building, MapPin, Mail, Calendar } from 'lucide-react';

export const ProfilePage = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-20 text-center skeleton h-64 max-w-2xl mx-auto mt-10" />;

    if (!user) return <div className="p-20 text-center font-heading">Пользователь не найден</div>;

    return (
        <div className="py-10 px-4 max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-heading italic text-primary mb-10">Профиль автора</h1>

            <div className="bg-white shadow-card border-t-4 border-primary grid grid-cols-1 md:grid-cols-3">
                {/* Аватар/Иконка */}
                <div className="p-10 bg-grey-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                        <User size={48} />
                    </div>
                    <span className="text-[10px] font-accent font-bold uppercase px-3 py-1 bg-accent text-white rounded-full">
                        {user.role_code}
                    </span>
                </div>

                {/* Основные данные */}
                <div className="md:col-span-2 p-10 space-y-8">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-heading font-bold">{user.last_name} {user.first_name} {user.middle_name}</h2>
                        <p className="text-muted-foreground flex items-center gap-2"><Mail size={16} className="text-accent" /> {user.email}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-border">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-1">Организация</h4>
                                <p className="text-sm font-medium flex items-start gap-2"><Building size={16} className="text-muted shrink-0 mt-0.5" /> {user.organization || 'Не указана'}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-1">Страна</h4>
                                <p className="text-sm font-medium flex items-center gap-2"><MapPin size={16} className="text-muted" /> {user.country || 'Не указана'}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-1">Аккаунт создан</h4>
                                <p className="text-sm font-medium flex items-center gap-2"><Calendar size={16} className="text-muted" /> {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
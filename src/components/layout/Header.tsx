import { Link } from 'react-router-dom';
import { LogOut, User as UserIcon, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSessionStore } from '../../stores/session.store';

export const Header = () => {
    const { user, logout } = useSessionStore();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
            <div className="h-1 bg-primary w-full" />

            <div className="max-w-[1920px] mx-auto px-4 h-16 flex justify-between items-center">

                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm transition-transform group-hover:scale-105">
                        CSU
                    </div>
                    <div className="border-l border-border pl-3">
                        <h1 className="text-base leading-none uppercase tracking-tight text-foreground font-heading group-hover:text-primary transition-colors">
                            <span className="text-primary">ЧелГУ</span>
                        </h1>
                        <p className="text-[7px] text-muted-foreground uppercase tracking-[0.3em] mt-0.5 font-accent font-bold">
                            {i18n.language.startsWith('ru') ? 'Научный журнал' : 'Scientific Journal'}
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-6">

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all px-2 py-1 rounded-sm border border-transparent hover:border-border"
                        title={i18n.language.startsWith('ru') ? 'Switch to English' : 'Переключить на русский'}
                    >
                        <Globe size={14} />
                        <span>{i18n.language.toUpperCase().slice(0, 2)}</span>
                    </button>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <UserIcon size={14} />
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <span className="block text-[10px] font-accent font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                                            {user.last_name} {user.first_name[0]}.
                                        </span>
                                        <span className="block text-[9px] text-muted-foreground font-accent uppercase">
                                            {t(`common.roles.${user.role_code}`)}
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:text-primary-hover border-b border-transparent hover:border-primary pb-0.5 transition-all"
                            >
                                {t('nav.login')}
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};
import { Link } from 'react-router-dom';
import { LogOut, User as UserIcon, Globe, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSessionStore } from '../../stores/session.store';

interface HeaderProps {
    onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
    const { user, logout } = useSessionStore();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b border-primary-hover shadow-md">
            <div className="max-w-[1920px] mx-auto px-4 h-16 flex justify-between items-center">

                <div className="flex items-center gap-3">
                    {onMenuToggle && (
                        <button
                            onClick={onMenuToggle}
                            className="lg:hidden p-1.5 -ml-1.5 rounded-sm text-primary-foreground hover:bg-primary-hover transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-primary-foreground text-primary flex items-center justify-center font-heading font-bold text-sm transition-transform group-hover:scale-105 rounded-sm">
                            CSU
                        </div>
                        <div className="border-l border-primary-hover pl-3">
                            <h1 className="text-base leading-none uppercase tracking-tight text-primary-foreground font-heading group-hover:text-white transition-colors">
                                <span>ЧелГУ</span>
                            </h1>
                            <p className="text-[7px] text-white/70 uppercase tracking-[0.3em] mt-0.5 font-accent font-bold">
                                {i18n.language.startsWith('ru') ? 'Научный журнал' : 'Scientific Journal'}
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-white/10 text-primary-foreground group-hover:bg-white group-hover:text-primary transition-colors flex items-center justify-center">
                                        <UserIcon size={14} />
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <span className="block text-[10px] font-accent font-bold uppercase text-primary-foreground group-hover:text-white transition-colors">
                                            {user.last_name} {user.first_name[0]}.
                                        </span>
                                        <span className="block text-[9px] text-white/70 font-accent uppercase">
                                            {t(`common.roles.${user.role_code}`)}
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-primary-foreground/80 hover:text-white transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary-foreground hover:text-white border-b border-transparent hover:border-white pb-0.5 transition-all"
                            >
                                {t('nav.login')}
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-[10px] font-accent font-bold uppercase tracking-widest text-primary-foreground/80 hover:text-white transition-all px-2 py-1 rounded-sm border border-transparent hover:border-primary-hover"
                        title={i18n.language.startsWith('ru') ? 'Switch to English' : 'Переключить на русский'}
                    >
                        <Globe size={14} />
                        <span>{i18n.language.toUpperCase().slice(0, 2)}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
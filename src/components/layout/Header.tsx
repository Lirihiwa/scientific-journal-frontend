/* filepath: src/components/layout/Header.tsx */
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
                        {/* Интегрированный векторный логотип ЧелГУ */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="56"
                            viewBox="0 0 85 56"
                            fill="none"
                            className="h-10 w-auto transition-transform group-hover:scale-105"
                        >
                            <path fill="#fff" fillRule="evenodd" d="M68.668 0c0 16.574-4.1 32.959-16.459 43.99a21.327 21.327 0 0 0-1.625-2.037C58.086 28.867 57.406 15.405 56.007 0h12.68-.019Z" clipRule="evenodd" />
                            <path fill="#fff" fillRule="evenodd" d="m47.205 38.955.056-.283c3.08-14.858-3.741-24.663-7.974-38.653H51.76c1.398 15.404 4.818 27.359-2.702 40.444a17.99 17.99 0 0 0-1.871-1.49" clipRule="evenodd" />
                            <path fill="#fff" fillRule="evenodd" d="M34.883 0c4.233 9.805 12.68 22.4 10.337 37.673a21.257 21.257 0 0 0-3.402-1.528C41.498 20.665 29.158 8.277 22.431 0h12.471-.019ZM84.164 0c0 21.193-11.848 39.634-29.308 49.137a19.757 19.757 0 0 0-1.474-3.281C65.759 34.826 72.902 16.574 72.902 0h11.262Z" clipRule="evenodd" />
                            <path fill="#fff" fillRule="evenodd" d="M41.516 39.408c5.12 1.942 9.108 6.052 10.79 11.162C44.898 54.058 36.603 56 27.835 56c-1.474 0-2.93-.056-4.366-.17-5.933-.414-14.059-3.374-17.781-7.372-3.742-3.997-5.915-9.333-5.67-15.065 0-.32.02-.51.02-.566.397-5.505 3.042-10.351 7.01-13.726 3.95-3.375 9.24-5.318 14.985-5.072.34 0 .548.018.624.037a17.802 17.802 0 0 1 11.791 5.581c2.948 3.168 4.687 7.392 4.479 11.917 0 .283-.02.434-.02.452-.32 4.375-2.399 8.202-5.555 10.88-3.136 2.677-7.313 4.205-11.867 4.016-.302 0-.453-.019-.491-.019a13.004 13.004 0 0 1-8.636-4.091c-2.173-2.32-3.439-5.43-3.288-8.75v-.339c.227-3.224 1.777-6.052 4.1-8.032 2.306-1.96 5.386-3.092 8.731-2.96h.359a8.293 8.293 0 0 1 5.499 2.602c1.38 1.49 2.192 3.47 2.097 5.6v.207c-.15 2.074-1.152 3.903-2.645 5.185-1.474 1.264-3.458 1.98-5.593 1.905h-.227c-1.928-.132-3.402-1.773-3.25-3.658.132-1.886 1.814-3.3 3.76-3.168h.038c.264 0 .51-.075.68-.207a.754.754 0 0 0 .265-.528c0-.094 0-.019 0 0 0-.283-.095-.528-.284-.735a1.216 1.216 0 0 0-.794-.378h-.17c-1.473-.056-2.815.434-3.798 1.283a4.981 4.981 0 0 0-1.72 3.375v.15c-.056 1.452.51 2.829 1.475 3.866a5.973 5.973 0 0 0 3.949 1.867c.227 0 .246.018.302.018 2.665.114 5.121-.773 6.935-2.319a9.018 9.018 0 0 0 3.175-6.222c0-.207.019-.226.019-.264.113-2.659-.907-5.148-2.665-7.014a10.64 10.64 0 0 0-7.086-3.356c-.264-.02-.416-.038-.416-.038-3.873-.17-7.426 1.131-10.053 3.375-2.626 2.225-4.365 5.43-4.63 9.088v.377c-.207 3.847 1.286 7.448 3.818 10.182a15.436 15.436 0 0 0 10.223 4.846c9.108.622 14.135-2.432 20.427-9.315" clipRule="evenodd" />
                        </svg>

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
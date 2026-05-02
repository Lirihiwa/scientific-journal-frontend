import { Link } from 'react-router-dom';
import {BookOpen, LogOut} from 'lucide-react';
import {useAuth} from "../../hooks/useAuth.ts";

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-border sticky top-0 z-40">
            <div className="bg-primary text-primary-foreground py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-accent uppercase tracking-[0.2em]">
                    <span>Челябинский государственный университет</span> {/* // LOC layout.university_name */}
                    <div className="flex gap-4">
                        <button className="hover:text-accent transition-colors cursor-pointer">RU</button>
                        <button className="hover:text-accent transition-colors cursor-pointer opacity-50">EN</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <BookOpen className="text-primary" size={28} />
                    <div>
                        <h1 className="text-lg leading-none uppercase tracking-tighter italic">Вестник ЧелГУ</h1> {/* // LOC layout.title */}
                        <p className="text-[9px] text-semi-transparent uppercase tracking-[0.3em] mt-0.5">Scientific Journal</p>
                    </div>
                </Link>

                <nav className="flex items-center gap-8">
                    {/* Ссылки доступны всем */}
                    <Link to="/archive" className="...">Архив</Link>

                    {/* Кабинет автора доступен только авторизованным */}
                    {user && <Link to="/submissions" className="...">Мои статьи</Link>}

                    {/* Панель редактора видна только персоналу */}
                    {user && (user.role_code === 'editor' || user.role_code === 'admin') && (
                        <Link to="/editor" className="text-accent ... underline">Редакция</Link>
                    )}

                    {/* Кнопка входа или профиль */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold uppercase text-primary">{user.last_name}</span>
                            <button onClick={logout} className="text-muted hover:text-red-600"><LogOut size={16} /></button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-outline !py-1.5 !px-4">Войти</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
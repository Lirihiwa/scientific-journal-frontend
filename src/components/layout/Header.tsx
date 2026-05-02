import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Header = () => {
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
                    <Link to="/archive" className="text-xs font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        Архив {/* // LOC nav.archive */}
                    </Link>
                    <Link to="/submissions" className="text-xs font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        Подача статьи {/* // LOC nav.submit */}
                    </Link>
                    <Link to="/login" className="btn-outline !py-1.5 !px-4">
                        Войти {/* // LOC nav.login */}
                    </Link>
                </nav>
            </div>
        </header>
    );
};
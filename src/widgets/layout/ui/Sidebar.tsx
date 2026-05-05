// src/widgets/layout/ui/Sidebar.tsx
import {NavLink} from 'react-router-dom';
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Database,
    Download,
    FileText,
    Info,
    Scale,
    Send,
    ShieldCheck,
    Users
} from 'lucide-react';
import {cn} from '../../../shared/lib/utils';
import {useSidebarStore} from '../../../entities/layout/model/sidebar.store';
import {useSessionStore} from '../../../entities/session/model/store';

// Ссылка с учетом состояния сворачивания и точного совпадения пути
const NavItem = ({to, icon, label, isCollapsed, end = false}: {
    to: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    end?: boolean;
}) => (
    <NavLink
        to={to}
        end={end}
        className={({isActive}) => cn(
            "flex items-center gap-3 px-3 py-2.5 text-[11px] font-medium transition-colors rounded-sm",
            isActive
                ? "bg-primary/10 text-primary font-bold"
                : "text-foreground hover:bg-muted hover:text-primary",
            isCollapsed && "justify-center px-0"
        )}
        title={isCollapsed ? label : undefined}
    >
        <span className="shrink-0">{icon}</span>
        {!isCollapsed && <span className="truncate">{label}</span>}
    </NavLink>
);

// Секция с заголовком
const Section = ({title, children, isCollapsed}: {
    title: string;
    children: React.ReactNode;
    isCollapsed: boolean;
}) => {
    if (isCollapsed) return <div className="space-y-1">{children}</div>;
    return (
        <div className="space-y-1">
            <h3 className="px-3 pt-4 pb-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
                {title}
            </h3>
            <div className="space-y-0.5">{children}</div>
        </div>
    );
};

export const Sidebar = () => {
    const {isCollapsed, toggle} = useSidebarStore();
    const {user} = useSessionStore();

    // Показываем панель редактора только пользователям с соответствующими ролями
    const isEditorOrAdmin = user?.role_code === 'editor' || user?.role_code === 'admin';

    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-academic">
            {/* Кнопка сворачивания/разворачивания */}
            <div className="flex justify-end p-3 border-b border-border">
                <button
                    onClick={toggle}
                    className="p-1.5 rounded-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                    aria-label={isCollapsed ? "Развернуть меню" : "Свернуть меню"}
                >
                    {isCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
                </button>
            </div>

            <div className="flex-grow p-3 space-y-4">

                {/* === ЖУРНАЛ === */}
                <Section title="Журнал" isCollapsed={isCollapsed}>
                    <NavItem to="/" icon={<BookOpen size={16}/>} label="Главная" isCollapsed={isCollapsed} end/>
                    <NavItem to="/archive" icon={<FileText size={16}/>} label="Архив" isCollapsed={isCollapsed}/>
                    <NavItem to="/about" icon={<Info size={16}/>} label="О журнале" isCollapsed={isCollapsed}/>
                    <NavItem to="/editorial" icon={<Users size={16}/>} label="Ред. коллегия" isCollapsed={isCollapsed}/>
                </Section>

                {/* === АВТОРАМ === */}
                <Section title="Авторам" isCollapsed={isCollapsed}>
                    <NavItem to="/submissions/new" icon={<Send size={16}/>} label="Подать статью"
                             isCollapsed={isCollapsed}/>
                    <NavItem to="/submissions" icon={<Download size={16}/>} label="Мои рукописи"
                             isCollapsed={isCollapsed} end/>
                    <NavItem to="/info/guidelines" icon={<Scale size={16}/>} label="Требования"
                             isCollapsed={isCollapsed}/>
                </Section>

                {/* === РЕДАКЦИОННАЯ ПАНЕЛЬ (Только для editor/admin) === */}
                {isEditorOrAdmin && (
                    <Section title="Редакция" isCollapsed={isCollapsed}>
                        <NavItem
                            to="/editor"
                            icon={<ShieldCheck size={16}/>}
                            label="Панель редактора"
                            isCollapsed={isCollapsed}
                            end
                        />
                    </Section>
                )}

                {/* === ИНДЕКСАЦИЯ === */}
                {!isCollapsed ? (
                    <Section title="Индексация" isCollapsed={false}>
                        <div
                            className="px-3 py-2 bg-muted/30 border border-border rounded-sm text-[10px] font-accent font-bold uppercase tracking-tight text-muted-foreground">
                            РИНЦ / Scopus / DOI
                        </div>
                    </Section>
                ) : (
                    <div className="flex justify-center py-2">
                        <div
                            className="w-8 h-8 flex items-center justify-center bg-muted/30 border border-border rounded-sm text-muted-foreground"
                            title="Индексация: РИНЦ / Scopus / DOI"
                        >
                            <Database size={14}/>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
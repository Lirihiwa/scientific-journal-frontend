import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    Users,
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSidebarStore } from '../../stores/sidebar.store';
import { useSessionStore } from '../../stores/session.store';
import React from 'react';

const NavItem = ({ to, icon, label, isCollapsed, end = false }: {
    to: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    end?: boolean;
}) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 text-[11px] font-medium transition-colors duration-200 rounded-sm",
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

const Section = ({ title, children, isCollapsed }: {
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

interface SidebarProps {
    onMobileClose?: () => void;
}

export const Sidebar = ({ onMobileClose }: SidebarProps) => {
    const { t, i18n } = useTranslation();
    const { isCollapsed, toggle } = useSidebarStore();
    const { user } = useSessionStore();

    const isEditorOrAdmin = user?.role_code === 'editor' || user?.role_code === 'admin';
    const lang = i18n.language.startsWith('ru') ? 'ru' : 'en';

    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-academic relative">
            {/* Кнопка сворачивания отображается только на десктопе */}
            <div className="hidden lg:flex justify-end p-3 border-b border-border">
                <button
                    onClick={toggle}
                    className="p-1.5 rounded-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
                    aria-label={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Абсолютно позиционированная кнопка закрытия для мобильной версии */}
            {onMobileClose && (
                <button
                    onClick={onMobileClose}
                    className="lg:hidden absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    aria-label="Close menu"
                >
                    <X size={16} />
                </button>
            )}

            {/* Контент бокового меню с адаптивным верхним отступом на мобильных */}
            <div className="flex-grow p-3 pt-14 lg:pt-3 space-y-4">

                <Section title={lang === 'ru' ? 'Журнал' : 'Journal'} isCollapsed={isCollapsed}>
                    <NavItem to="/" icon={<BookOpen size={16} />} label={t('nav.home')} isCollapsed={isCollapsed} end />
                    <NavItem to="/archive" icon={<FileText size={16} />} label={t('nav.archive')} isCollapsed={isCollapsed} />
                    <NavItem to="/about" icon={<Info size={16} />} label={t('nav.about')} isCollapsed={isCollapsed} />
                    <NavItem to="/editorial" icon={<Users size={16} />} label={t('nav.editorial')} isCollapsed={isCollapsed} />
                </Section>

                <Section title={lang === 'ru' ? 'Авторам' : 'For Authors'} isCollapsed={isCollapsed}>
                    <NavItem to="/submissions/new" icon={<Send size={16} />} label={t('nav.submit')} isCollapsed={isCollapsed} />
                    <NavItem to="/submissions" icon={<Download size={16} />} label={t('nav.my_submissions')} isCollapsed={isCollapsed} end />
                    <NavItem to="/info/guidelines" icon={<Scale size={16} />} label={t('nav.guidelines')} isCollapsed={isCollapsed} />
                </Section>

                {isEditorOrAdmin && (
                    <Section title={lang === 'ru' ? 'Редакция' : 'Editorial'} isCollapsed={isCollapsed}>
                        <NavItem
                            to="/editor"
                            icon={<ShieldCheck size={16} />}
                            label={t('nav.editor_panel')}
                            isCollapsed={isCollapsed}
                            end
                        />
                    </Section>
                )}

                {!isCollapsed ? (
                    <Section title={lang === 'ru' ? 'Индексация' : 'Indexing'} isCollapsed={false}>
                        <div
                            className="px-3 py-2 bg-muted/30 border border-border rounded-sm text-[10px] font-accent font-bold uppercase tracking-tight text-muted-foreground">
                            РИНЦ / Scopus / DOI
                        </div>
                    </Section>
                ) : (
                    <div className="flex justify-center py-2">
                        <div
                            className="w-8 h-8 flex items-center justify-center bg-muted/30 border border-border rounded-sm text-muted-foreground"
                            title="Indexing: RSCI / Scopus / DOI"
                        >
                            <Database size={14} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
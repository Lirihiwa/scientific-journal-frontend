import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../stores/sidebar.store';
import { cn } from '../../utils/cn';

export const MainLayout = () => {
    const { isCollapsed } = useSidebarStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">

            <div className="shrink-0 z-20">
                <Header onMenuToggle={() => setIsSidebarOpen(true)} />
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                {/* Задний фон (backdrop) с эффектом размытия на мобильных */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden animate-fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Контейнер Sidebar с адаптивной тенью */}
                <aside className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-card border-r border-border/30 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out shrink-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:static lg:translate-x-0 lg:flex lg:z-10 lg:shadow-none lg:border-r lg:border-border",
                    isCollapsed ? 'lg:w-16' : 'lg:w-64'
                )}>
                    <Sidebar onMobileClose={() => setIsSidebarOpen(false)} />
                </aside>

                <main className="flex-1 w-full bg-muted/20 overflow-y-auto scrollbar-academic">
                    <Outlet />
                </main>
            </div>

            <footer className="shrink-0 bg-card border-t border-border py-4 z-20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-accent">
                        © {new Date().getFullYear()} Академическое издательство
                    </p>
                </div>
            </footer>
        </div>
    );
};
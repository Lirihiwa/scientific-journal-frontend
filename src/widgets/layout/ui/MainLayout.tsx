// src/widgets/layout/ui/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../../entities/layout/model/sidebar.store';

export const MainLayout = () => {
    const { isCollapsed } = useSidebarStore();

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
            <Header />

            {/* Flex-контейнер для адаптивной раскладки */}
            <div className="flex flex-grow bg-muted/20 border-y border-border">

                {/* Сайдбар: скрыт на mobile, сворачивается на desktop */}
                <aside className={`
          hidden lg:flex flex-col border-r border-border bg-card 
          transition-all duration-300 ease-in-out overflow-hidden
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}>
                    <Sidebar />
                </aside>

                {/* Основной контент */}
                <main className="flex-grow p-4 lg:p-8 min-h-[60vh] overflow-x-hidden">
                    <Outlet />
                </main>

            </div>

            <footer className="bg-card border-t border-border py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-accent">
                        © {new Date().getFullYear()} Академическое издательство · ИС управления научным журналом
                    </p>
                </div>
            </footer>
        </div>
    );
};
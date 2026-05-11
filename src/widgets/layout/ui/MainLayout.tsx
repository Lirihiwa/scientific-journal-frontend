// src/widgets/layout/ui/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../../entities/layout/model/sidebar.store';

export const MainLayout = () => {
    const { isCollapsed } = useSidebarStore();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <div className="flex flex-grow border-y border-border">
                <aside className={`
                    hidden lg:flex flex-col border-r border-border bg-card 
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isCollapsed ? 'w-16' : 'w-64'}
                `}>
                    <Sidebar />
                </aside>

                <main className="flex-grow w-full bg-muted/20">
                    <Outlet />
                </main>
            </div>

            <footer className="bg-card border-t border-border py-6">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-accent">
                        © {new Date().getFullYear()} Академическое издательство
                    </p>
                </div>
            </footer>
        </div>
    );
};
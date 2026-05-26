import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../stores/sidebar.store';

export const MainLayout = () => {
    const { isCollapsed } = useSidebarStore();

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">

            <div className="shrink-0 z-20">
                <Header />
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                <aside className={`
                    hidden lg:flex flex-col border-r border-border bg-card 
                    transition-all duration-300 ease-in-out shrink-0
                    ${isCollapsed ? 'w-16' : 'w-64'}
                `}>
                    <Sidebar />
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
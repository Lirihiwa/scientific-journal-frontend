// src/widgets/layout/ui/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../../entities/layout/model/sidebar.store';

export const MainLayout = () => {
    const { isCollapsed } = useSidebarStore();

    return (
        // 1. Фиксируем высоту строго по размеру окна (h-screen) и запрещаем скролл всей страницы
        <div className="h-screen flex flex-col bg-background overflow-hidden">

            {/* 2. ШАПКА (shrink-0 не дает ей сжиматься) */}
            <div className="shrink-0 z-20">
                <Header />
            </div>

            {/* 3. СРЕДНЯЯ ЧАСТЬ (розовый блок на схеме) - занимает всё оставшееся пространство */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* 4. НАВИГАЦИЯ (зафиксирована слева) */}
                <aside className={`
                    hidden lg:flex flex-col border-r border-border bg-card 
                    transition-all duration-300 ease-in-out shrink-0
                    ${isCollapsed ? 'w-16' : 'w-64'}
                `}>
                    {/* Компонент Sidebar уже имеет h-full и overflow-y-auto внутри себя */}
                    <Sidebar />
                </aside>

                {/* 5. КОНТЕНТ (только этот блок имеет право скроллиться) */}
                <main className="flex-1 w-full bg-muted/20 overflow-y-auto scrollbar-academic">
                    <Outlet />
                </main>
            </div>

            {/* 6. ФУТЕР (всегда виден внизу экрана) */}
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
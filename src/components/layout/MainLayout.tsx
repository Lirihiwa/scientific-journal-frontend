// src/components/layout/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Основной контент */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>

            {/* Подвал в академическом стиле */}
            <footer className="bg-white border-t border-border py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-accent font-bold uppercase tracking-widest text-xs text-primary mb-4">
                            Контакты {/* // LOC footer.contacts.title */}
                        </h4>
                        <p className="text-sm text-semi-transparent leading-relaxed">
                            454001, г. Челябинск, ул. Братьев Кашириных, 129<br />
                            {/* // LOC footer.contacts.address */}
                            Тел.: +7 (351) 799-71-11<br />
                            Email: info@csu.ru
                        </p>
                    </div>
                    <div>
                        <h4 className="font-accent font-bold uppercase tracking-widest text-xs text-primary mb-4">
                            Информация {/* // LOC footer.info.title */}
                        </h4>
                        <ul className="text-sm text-semi-transparent space-y-2">
                            <li><a href="#" className="hover:text-primary transition-colors">О журнале</a></li> {/* // LOC footer.links.about */}
                            <li><a href="#" className="hover:text-primary transition-colors">Редакционная коллегия</a></li> {/* // LOC footer.links.editorial */}
                            <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li> {/* // LOC footer.links.privacy */}
                        </ul>
                    </div>
                    <div className="md:text-right">
                        <div className="inline-block border-2 border-primary p-2 mb-4">
                            <span className="font-heading font-bold text-primary tracking-tighter italic">CSU Journal</span>
                        </div>
                        <p className="text-[10px] text-muted uppercase tracking-widest">
                            © {new Date().getFullYear()} Челябинский Государственный Университет<br />
                            {/* // LOC footer.copyright */}
                            Все права защищены
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
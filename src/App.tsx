// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { MainLayout } from './components/layout/MainLayout';

// Modules: Auth
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';

// Создаем клиент для React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Публичные и защищенные маршруты внутри MainLayout */}
                    <Route path="/" element={<MainLayout />}>

                        {/* Главная страница (Public Module) */}
                        <Route index element={
                            <div className="py-20 text-center">
                                <h2 className="text-4xl font-heading uppercase italic">Добро пожаловать</h2> {/* // LOC home.welcome */}
                                <p className="text-semi-transparent mt-4">Выберите раздел в меню выше</p> {/* // LOC home.description */}
                            </div>
                        } />

                        {/* Авторизация (Auth Module) */}
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />

                        {/* Заглушки для будущих модулей */}
                        <Route path="archive" element={<div className="py-20 text-center">Архив публикаций (В разработке)</div>} />
                        <Route path="submissions" element={<div className="py-20 text-center">Кабинет автора (В разработке)</div>} />

                        {/* 404 - Redirect to home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
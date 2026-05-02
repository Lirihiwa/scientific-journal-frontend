// src/App.tsx
import React from 'react';
import { AuthProvider } from './store/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { MainLayout } from './components/layout/MainLayout';

// Modules: Auth
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';

// Modules: Author
import { DashboardPage } from './modules/author/pages/DashboardPage';
import { CreateSubmissionPage } from './modules/author/pages/CreateSubmissionPage';
import { SubmissionDetailsPage } from './modules/author/pages/SubmissionDetailsPage';

// Modules: Public
import { HomePage } from './modules/public/pages/HomePage';
import { ArchivePage } from './modules/public/pages/ArchivePage';

// Modules: Editor
import { EditorDashboard } from './modules/editor/pages/EditorDashboard';
import { RoleGuard } from './components/layout/RoleGuard';

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
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Публичные и защищенные маршруты внутри MainLayout */}
                        <Route path="/" element={<MainLayout />}>

                            {/* Главная страница (Public Module) */}
                            <Route index element={<HomePage />} />

                            {/* Авторизация (Auth Module) */}
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />

                            {/* Заглушки для будущих модулей */}
                            <Route path="archive" element={<div className="py-20 text-center">Архив публикаций (В разработке)</div>} />
                            <Route path="submissions" element={<DashboardPage />} />
                            <Route path="submissions/new" element={<CreateSubmissionPage />} />
                            <Route path="submissions/:id" element={<SubmissionDetailsPage />} />
                            <Route path="archive" element={<ArchivePage />} />

                            <Route
                                path="editor"
                                element={
                                    <RoleGuard roles={['editor', 'admin']}>
                                        <EditorDashboard />
                                    </RoleGuard>
                                }
                            />

                            {/* 404 - Redirect to home */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
// src/App.tsx
import React from 'react';
import { AuthProvider } from './store/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Layouts
import { MainLayout } from './components/layout/MainLayout';

// Modules: Auth
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';
import { ProfilePage } from './modules/auth/pages/ProfilePage';

// Modules: Author
import { DashboardPage } from './modules/author/pages/DashboardPage';
import { CreateSubmissionPage } from './modules/author/pages/CreateSubmissionPage';
import { SubmissionDetailsPage } from './modules/author/pages/SubmissionDetailsPage';

// Modules: Public
import { HomePage } from './modules/public/pages/HomePage';
import { ArchivePage } from './modules/public/pages/ArchivePage';
import { PublicationPage } from './modules/public/pages/PublicationPage';
import { IssuePage } from './modules/public/pages/IssuePage';

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
                    {/* Настройка Toaster: позиция, стиль */}
                    <Toaster
                        position="top-right"
                        richColors
                        theme="light"
                        toastOptions={{
                            style: { borderRadius: '0px', borderTop: '2px solid #004080' }
                        }}
                    />
                    <Routes>
                        {/* Публичные и защищенные маршруты внутри MainLayout */}
                        <Route path="/" element={<MainLayout />}>

                            {/* Главная страница (Public Module) */}
                            <Route index element={<HomePage />} />

                            {/* Авторизация (Auth Module) */}
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                            <Route path="profile" element={<ProfilePage />} />

                            {/* Заглушки для будущих модулей */}
                            <Route path="submissions" element={<DashboardPage />} />
                            <Route path="submissions/new" element={<CreateSubmissionPage />} />
                            <Route path="submissions/:id" element={<SubmissionDetailsPage />} />
                            <Route path="archive" element={<ArchivePage />} />
                            <Route path="publications/:id" element={<PublicationPage />} />
                            <Route path="issues/:id" element={<IssuePage />} />


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
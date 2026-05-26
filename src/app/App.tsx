// src/app/App.tsx
import {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'sonner';

// Стор сессии (Zustand)
import {useSessionStore} from '../entities/session/model/store';

// Providers & Layouts
import {RoleGuard} from '../components/layout/RoleGuard.tsx';
import {MainLayout} from '../components/layout/MainLayout.tsx';

// PAGES (Импортируем из слоя pages)
// Auth
import {LoginPage} from '../pages/auth/LoginPage';
import {RegisterPage} from '../pages/auth/RegisterPage';
import {ProfilePage} from '../pages/auth/ProfilePage';

// Public
import {HomePage} from '../pages/public/HomePage';
import {PublicationPage} from '../pages/public/PublicationPage';
import {ArchivePage} from '../pages/public/ArchivePage';
import {IssuePage} from '../pages/public/IssuePage';


// Author
import {DashboardPage} from '../pages/author/DashboardPage';
import {CreateSubmissionPage} from '../pages/author/CreateSubmissionPage';
import {SubmissionDetailsPage} from '../pages/author/SubmissionDetailsPage'; // Добавишь позже
// Editor
import {EditorDashboard} from '../pages/editor/EditorDashboard';
import {StaticPagePlaceholder} from "../pages/public/StaticPagePlaceholder.tsx";

// Настройка Query Client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 минут кеширования по умолчанию
        },
    },
});

export const App = () => {
    const {checkAuth} = useSessionStore();

    // Инициализация приложения: проверяем токен в localStorage при первом рендере
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <QueryClientProvider client={queryClient}>
            {/* Глобальные уведомления в строгом стиле */}
            <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                    className: 'font-sans text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-xl border-l-4',
                    style: {borderRadius: '0px'}
                }}
            />

            <BrowserRouter>
                <Routes>
                    {/* Все страницы внутри MainLayout */}
                    <Route path="/" element={<MainLayout/>}>

                        {/* --- ПУБЛИЧНЫЕ РОУТЫ --- */}
                        <Route index element={<HomePage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="about" element={<StaticPagePlaceholder title={"О журнале"} />} />
                        <Route path="editorial" element={<StaticPagePlaceholder title="Редакционная коллегия" />} />
                        <Route path="ethics" element={<StaticPagePlaceholder title="Этика публикаций" />} />
                        <Route path="review-process" element={<StaticPagePlaceholder title="Процесс рецензирования" />} />
                        <Route path="info/guidelines" element={<StaticPagePlaceholder title="Информация для авторов" />} />


                        {/* Публичный архив и статьи */}
                        <Route path="archive" element={<ArchivePage/>}/>
                        <Route path="issues/:id" element={<IssuePage/>}/>
                        <Route path="publications/:id" element={<PublicationPage/>}/>

                        {/* --- ПРИВАТНЫЕ РОУТЫ (Личный кабинет автора) --- */}
                        <Route
                            path="submissions"
                            element={
                                <RoleGuard>
                                    <DashboardPage/>
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="submissions/new"
                            element={
                                <RoleGuard roles={['author', 'editor', 'admin']}>
                                    <CreateSubmissionPage/>
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="submissions/:id"
                            element={
                                <RoleGuard>
                                    <SubmissionDetailsPage/>
                                </RoleGuard>
                            }
                        />

                        {/* Профиль */}
                        <Route path="profile" element={<RoleGuard><ProfilePage/></RoleGuard>}/>

                        {/* --- РОУТЫ РЕДАКТОРА (Доступ только с ролью) --- */}
                        <Route
                            path="editor"
                            element={
                                <RoleGuard roles={['editor', 'admin']}>
                                    <EditorDashboard/>
                                </RoleGuard>
                            }
                        />

                        {/* Редирект для несуществующих страниц */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
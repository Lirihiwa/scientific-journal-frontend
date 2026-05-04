import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChevronLeft,
    FileText,
    Calendar,
    User,
    MessageSquare,
    Download,
    UploadCloud,
    CheckCircle,
    AlertTriangle,
    Clock,
    // ExternalLink
} from 'lucide-react';

// API и Состояние
import { submissionsApi } from '../../../api/submissions';
import { useAuth } from '../../../hooks/useAuth';

// UI Компоненты
import { Button } from '../../../components/ui/Button';
import {toast} from "sonner";

export const SubmissionDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Состояние для выбора нового файла (версионность)
    const [updateFile, setUpdateFile] = useState<File | null>(null);

    // 1. Загрузка данных статьи и событий (Timeline)
    const { data: submission, isLoading, error } = useQuery({
        queryKey: ['submission', id],
        queryFn: () => submissionsApi.getSubmissionDetails(id!).then(res => res.data),
        enabled: !!id
    });

    // 2. Мутация для загрузки новой версии файла
    const uploadMutation = useMutation({
        mutationFn: (file: File) => submissionsApi.uploadFile(id!, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submission', id] });
            setUpdateFile(null);
            toast.success("Новая версия рукописи успешно загружена");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.detail || "Ошибка при загрузке файла");
        }
    });

    if (isLoading) return (
        <div className="p-20 text-center font-accent uppercase text-xs animate-pulse tracking-widest text-muted">
            Загрузка данных рукописи... {/* // LOC common.loading */}
        </div>
    );

    if (error || !submission) return (
        <div className="p-20 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-heading">Статья не найдена или доступ ограничен</h2> {/* // LOC submission.error.not_found */}
            <Link to="/submissions" className="text-primary underline mt-4 inline-block">Вернуться в кабинет</Link>
        </div>
    );

    // ПРАВА ДОСТУПА
    const isAuthor = user?.id === submission.author_id;
    // Можно ли обновлять файл: только автор и только в определенных статусах
    const canUpdateFile = isAuthor && (submission.status === 'new' || submission.status === 'revision_required');

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            {/* ВЕРХНЯЯ НАВИГАЦИЯ */}
            <Link
                to="/submissions"
                className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 font-accent font-bold uppercase text-[10px] tracking-widest transition-colors"
            >
                <ChevronLeft size={14} />
                Назад в личный кабинет {/* // LOC nav.back_to_dashboard */}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* ЛЕВАЯ КОЛОНКА: Контент статьи */}
                <div className="lg:col-span-2 space-y-10">
                    <header className="space-y-4">
                        <div className="flex items-center gap-3">
              <span className="text-[9px] font-accent font-bold uppercase px-2 py-0.5 bg-primary text-white">
                {submission.status} {/* // LOC status.[submission.status] */}
              </span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                ID: {submission.id}
              </span>
                        </div>
                        <h1 className="text-4xl font-heading leading-tight text-foreground">
                            {submission.title_ru}
                        </h1>
                        {submission.title_en && (
                            <h2 className="text-2xl font-heading italic text-semi-transparent">
                                {submission.title_en}
                            </h2>
                        )}
                    </header>

                    {/* Инфо-панель */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-border">
                        <div>
                            <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-3">Соавторы</h4> {/* // LOC submission.details.authors */}
                            <div className="space-y-2">
                                {submission.coauthors.length > 0 ? (
                                    submission.coauthors.map((auth, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <User size={14} className="text-muted" />
                                            <span className="font-medium">{auth.full_name}</span>
                                            <span className="text-[10px] text-muted italic">({auth.organization || '—'})</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted italic">Соавторы не указаны</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-1">Дата подачи</h4>
                                <p className="text-sm flex items-center gap-2 text-semi-transparent">
                                    <Calendar size={14} />
                                    {new Date(submission.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-1">Язык рукописи</h4>
                                <p className="text-sm uppercase font-bold text-accent">{submission.manuscript_language}</p>
                            </div>
                        </div>
                    </div>

                    {/* Аннотация */}
                    <section className="prose max-w-none">
                        <h3 className="text-xs font-accent font-bold uppercase tracking-[0.2em] text-primary border-b border-border pb-2 mb-4">
                            Аннотация (RU) {/* // LOC submission.details.abstract_ru */}
                        </h3>
                        <p className="font-serif leading-relaxed text-lg text-justify text-foreground">
                            {submission.abstract_ru}
                        </p>
                    </section>

                    {submission.abstract_en && (
                        <section className="prose max-w-none">
                            <h3 className="text-xs font-accent font-bold uppercase tracking-[0.2em] text-primary border-b border-border pb-2 mb-4">
                                Abstract (EN) {/* // LOC submission.details.abstract_en */}
                            </h3>
                            <p className="font-serif leading-relaxed text-base text-justify text-semi-transparent italic">
                                {submission.abstract_en}
                            </p>
                        </section>
                    )}
                </div>

                {/* ПРАВАЯ КОЛОНКА: Статус, Таймлайн и Файлы */}
                <div className="space-y-6">

                    {/* 1. Блок правок (если статус revision_required) */}
                    {submission.status === 'revision_required' && (
                        <div className="bg-amber-50 border-l-4 border-accent p-6 shadow-sm animate-pulse">
                            <div className="flex items-center gap-3 text-accent mb-2">
                                <AlertTriangle size={20} />
                                <h4 className="font-accent font-bold uppercase text-xs tracking-widest">Требуются правки</h4> {/* // LOC submission.status.revision_needed */}
                            </div>
                            <p className="text-xs text-amber-900 leading-relaxed italic">
                                Редактор вернул статью на доработку. Ознакомьтесь с замечаниями в истории и загрузите исправленный файл.
                            </p>
                        </div>
                    )}

                    {/* 2. Карточка текущего файла и Версионность */}
                    <div className="bg-primary text-white p-8 shadow-card relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <FileText size={80} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest mb-4 opacity-70">
                                    Актуальная версия: {submission.current_version} {/* // LOC submission.details.version_label */}
                                </h4>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/10 rounded-sm">
                                        <FileText size={24} />
                                    </div>
                                    <div className="overflow-hidden">
                    <span className="text-xs truncate block font-serif italic mb-1">
                      {submission.submitted_file_name || 'manuscript.pdf'}
                    </span>
                                        <span className="text-[9px] bg-accent text-white px-1.5 py-0.5 uppercase font-bold tracking-tighter">
                      Original PDF
                    </span>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full !border-white/50 !text-white hover:!bg-white hover:!text-primary">
                                    <Download size={14} /> Скачать файл {/* // LOC common.download */}
                                </Button>
                            </div>

                            {/* ЗОНА ОБНОВЛЕНИЯ (Версионность) */}
                            {canUpdateFile && (
                                <div className="pt-6 border-t border-white/10">
                                    {!updateFile ? (
                                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-sm p-6 hover:bg-white/5 cursor-pointer transition-all group">
                                            <UploadCloud size={24} className="mb-2 text-white/50 group-hover:text-accent transition-colors" />
                                            <span className="text-[10px] font-accent font-bold uppercase tracking-widest">Загрузить версию {submission.current_version + 1}</span> {/* // LOC submission.btn.upload_revision */}
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                className="hidden"
                                                onChange={(e) => setUpdateFile(e.target.files?.[0] || null)}
                                            />
                                        </label>
                                    ) : (
                                        <div className="space-y-3 animate-fade-in">
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-[10px] truncate font-mono italic">
                                                {updateFile.name}
                                            </div>
                                            <Button
                                                className="w-full !bg-accent !text-white border-none"
                                                isLoading={uploadMutation.isPending}
                                                onClick={() => uploadMutation.mutate(updateFile)}
                                            >
                                                <CheckCircle size={14} /> Подтвердить загрузку
                                            </Button>
                                            <button
                                                onClick={() => setUpdateFile(null)}
                                                className="w-full text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Таймлайн событий (История) */}
                    <div className="bg-white shadow-card p-8 border-t-4 border-accent">
                        <h3 className="text-xs font-accent font-bold uppercase tracking-widest mb-8 flex items-center gap-2 text-primary">
                            <Clock size={16} className="text-accent" />
                            История изменений {/* // LOC submission.details.history */}
                        </h3>

                        <div className="relative border-l border-border ml-2 pl-8 space-y-10">
                            {submission.events.map((event) => (
                                <div key={event.id} className="relative">
                                    {/* Точка на линии */}
                                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-accent bg-white shadow-sm" />

                                    <div className="text-[10px] font-accent font-bold text-muted uppercase mb-2 tracking-tighter">
                                        {new Date(event.created_at).toLocaleString()}
                                    </div>

                                    <div className="text-sm font-bold text-primary uppercase tracking-tight mb-2">
                                        {event.event_type === 'status_changed'
                                            ? (
                                                <span>
                          Статус: <span className="text-accent">{event.to_status}</span>
                        </span>
                                            )
                                            : event.event_type === 'file_uploaded'
                                                ? 'Обновлен файл рукописи'
                                                : 'Заявка создана и принята к рассмотрению'}
                                    </div>

                                    {event.comment && (
                                        <div className="mt-3 p-4 bg-grey-50 text-xs text-foreground italic border-l-2 border-primary/30 flex gap-3 shadow-inner">
                                            <MessageSquare size={14} className="shrink-0 text-muted mt-0.5" />
                                            <span className="leading-relaxed">{event.comment}</span>
                                        </div>
                                    )}

                                    {/* Метаданные события (если есть) */}
                                    {event.payload?.version && (
                                        <div className="mt-2 text-[9px] font-bold text-muted-foreground uppercase">
                                            Версия: {event.payload.version}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
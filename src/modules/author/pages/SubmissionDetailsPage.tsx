import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, FileText, Calendar, User, MessageSquare, Download } from 'lucide-react';
import { submissionsApi } from '../../../api/submissions';
import { Button } from '../../../components/ui/Button';

export const SubmissionDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: submission, isLoading } = useQuery({
        queryKey: ['submission', id],
        queryFn: () => submissionsApi.getSubmissionDetails(id!).then(res => res.data),
        enabled: !!id
    });

    if (isLoading) return <div className="p-20 text-center uppercase text-xs font-accent tracking-widest">Загрузка данных...</div>; // // LOC common.loading
    if (!submission) return <div className="p-20 text-center">Статья не найдена</div>; // // LOC submission.not_found

    return (
        <div className="py-10 px-4">
            {/* Навигация назад */}
            <Link to="/submissions" className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-8 font-accent font-bold uppercase text-xs tracking-widest transition-colors">
                <ChevronLeft size={16} />
                Назад к списку {/* // LOC common.back_to_list */}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* ЛЕВАЯ КОЛОНКА: Метаданные */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h1 className="text-3xl font-heading leading-tight mb-4">{submission.title_ru}</h1>
                        {submission.title_en && (
                            <p className="text-xl font-heading italic text-semi-transparent">{submission.title_en}</p>
                        )}
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-border">
                        <div>
                            <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted mb-2 text-primary">Авторы</h4> {/* // LOC submission.details.authors */}
                            <div className="space-y-1 text-sm font-medium">
                                {submission.coauthors.map((auth, idx) => (
                                    <p key={idx} className="flex items-center gap-2">
                                        <User size={14} className="text-muted" />
                                        {auth.full_name} <span className="text-[10px] text-muted">({auth.organization})</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted mb-2 text-primary">Информация</h4> {/* // LOC submission.details.info */}
                            <p className="text-sm flex items-center gap-2 text-semi-transparent">
                                <Calendar size={14} />
                                Подано: {new Date(submission.created_at).toLocaleDateString()} {/* // LOC submission.details.submitted_date */}
                            </p>
                            <p className="text-sm flex items-center gap-2 mt-1 text-semi-transparent uppercase font-bold text-[10px] tracking-tighter">
                                Версия: {submission.current_version} {/* // LOC submission.details.version */}
                            </p>
                        </div>
                    </div>

                    <section className="prose max-w-none">
                        <h3 className="text-lg font-heading uppercase mb-4 tracking-tighter italic">Аннотация</h3> {/* // LOC submission.details.abstract */}
                        <p className="text-foreground leading-relaxed text-justify font-serif">
                            {submission.abstract_ru}
                        </p>
                    </section>
                </div>

                {/* ПРАВАЯ КОЛОНКА: Таймлайн (Timeline) */}
                <div className="space-y-6">
                    <div className="bg-white shadow-card p-6 border-t-4 border-accent">
                        <h3 className="text-sm font-accent font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            История изменений {/* // LOC submission.details.history */}
                        </h3>

                        <div className="relative border-l-2 border-border ml-2 pl-6 space-y-8">
                            {submission.events.map((event) => (
                                <div key={event.id} className="relative">
                                    {/* Точка на линии */}
                                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-accent bg-white shadow-sm" />

                                    <div className="text-[10px] font-accent font-bold text-muted uppercase mb-1">
                                        {new Date(event.created_at).toLocaleString()}
                                    </div>

                                    <div className="text-sm font-bold text-primary uppercase tracking-tight mb-1">
                                        {event.event_type === 'status_changed'
                                            ? `Статус: ${event.to_status}` // // LOC status.[event.to_status]
                                            : event.event_type === 'file_uploaded'
                                                ? 'Файл обновлен' // // LOC event.file_uploaded
                                                : 'Заявка создана'} {/* // LOC event.created */}
                                    </div>

                                    {event.comment && (
                                        <div className="mt-2 p-3 bg-grey-50 text-xs text-foreground italic border-l-2 border-muted flex gap-2">
                                            <MessageSquare size={14} className="shrink-0 text-muted" />
                                            <span>{event.comment}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Карточка файла */}
                    <div className="bg-primary text-white p-6 shadow-card">
                        <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest mb-4 opacity-70">Текущий файл</h4> {/* // LOC submission.details.current_file */}
                        <div className="flex items-center gap-3 mb-4">
                            <FileText size={24} />
                            <span className="text-xs truncate font-serif italic">{submission.submitted_file_name || 'file.pdf'}</span>
                        </div>
                        <Button variant="outline" className="w-full !border-white !text-white hover:!bg-white hover:!text-primary">
                            <Download size={16} />
                            Скачать рукопись {/* // LOC common.download */}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};
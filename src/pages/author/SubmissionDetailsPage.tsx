// src/pages/author/SubmissionDetailsPage.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, FileUp, CheckCircle, Info, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Bagde';
import { Card } from '../../shared/ui/Card';
import { PageHeader } from '../../shared/ui/PageHeader';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Skeleton } from '../../shared/ui/Skeleton';
import { cn } from '../../shared/lib/utils';
import { submissionApi } from '../../entities/submission/api/submission.api';
import { SubmissionTimeline } from '../../widgets/submission/ui/SubmissionTimeline';

export const SubmissionDetailsPage = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [file, setFile] = useState<File | null>(null);

    const { data: submission, isLoading } = useQuery({
        queryKey: ['submission', id],
        queryFn: () => submissionApi.getById(id!),
        enabled: !!id,
    });

    const uploadFileMutation = useMutation({
        mutationFn: async (file: File) => {
            return submissionApi.uploadFile(id!, file);
        },
        onSuccess: () => {
            toast.success('Файл успешно обновлён');
            setFile(null);
            queryClient.invalidateQueries({ queryKey: ['submission', id] });
        },
        onError: () => toast.error('Ошибка загрузки файла'),
    });

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4 space-y-8">
                <Skeleton className="h-8 w-64" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <Skeleton className="h-96 w-full lg:col-span-2" />
                    <Skeleton className="h-64 w-full lg:col-span-1" />
                </div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <p className="font-serif text-muted-foreground">Рукопись не найдена</p>
                <Link to="/submissions" className="inline-flex items-center gap-2 mt-4 text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                    <ChevronLeft size={12} /> Вернуться к списку
                </Link>
            </div>
        );
    }

    const isEditable = ['new', 'revision_required'].includes(submission.status);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in space-y-10">
            <div className="flex items-center justify-between">
                <Link to="/submissions" className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    <ChevronLeft size={12} /> К списку рукописей
                </Link>
                <Badge variant={submission.status}>{submission.status.replace('_', ' ')}</Badge>
            </div>

            <PageHeader title="Данные рукописи" subtitle={`ID: ${submission.id.slice(0, 8)}`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-10">

                    {!isEditable && (
                        <Card variant="muted" padding="md" className="flex items-center gap-3">
                            <Info className="text-primary shrink-0" size={24} />
                            <p className="text-sm font-serif text-muted-foreground">
                                Рукопись находится в статусе «{submission.status.replace('_', ' ')}». Внесение изменений невозможно.
                            </p>
                        </Card>
                    )}

                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Метаданные" prefix="01." />
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">Заголовок (RU)</p>
                                <p className="text-base font-serif text-foreground">{submission.title_ru}</p>
                            </div>
                            {submission.title_en && (
                                <div>
                                    <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">Заголовок (EN)</p>
                                    <p className="text-base font-serif text-foreground">{submission.title_en}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">Ключевые слова (RU)</p>
                                <p className="text-sm font-serif text-foreground">{submission.keywords_ru}</p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Аннотация" prefix="02." />
                        <p className="text-sm font-serif text-foreground leading-relaxed text-justify">
                            {submission.abstract_ru}
                        </p>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Файл рукописи" prefix="03." />
                        <div className="p-4 bg-muted/30 border border-border rounded-sm mb-6">
                            <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">Текущая версия:</p>
                            <p className="text-sm font-serif text-foreground">{submission.submitted_file_name || "Файл не загружен"}</p>
                        </div>

                        {isEditable && (
                            <div className={cn("border-2 border-dashed rounded-sm p-8 text-center transition-colors", file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                                {!file ? (
                                    <label className="cursor-pointer block">
                                        <FileUp size={32} className="mx-auto text-muted-foreground mb-3" />
                                        <span className="text-[10px] font-accent font-bold uppercase tracking-widest">Выбрать PDF для замены</span>
                                        <input type="file" className="hidden" accept=".pdf,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
                                    </label>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <CheckCircle size={32} className="text-primary mb-2" />
                                        <p className="font-serif text-sm text-foreground mb-4">{file.name}</p>
                                        <div className="flex gap-4">
                                            <Button size="sm" onClick={() => uploadFileMutation.mutate(file)} isLoading={uploadFileMutation.isPending}>
                                                <Save size={14} className="mr-2" /> Сохранить файл
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => setFile(null)}>Отмена</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>

                {/* ПРАВАЯ КОЛОНКА (Таймлайн) - Плавающая */}
                <div className="lg:col-span-1 sticky top-24">
                    {/* Передаем submission.events, чтобы отобразить историю */}
                    <SubmissionTimeline events={(submission as any).events || []} />
                </div>
            </div>
        </div>
    );
};
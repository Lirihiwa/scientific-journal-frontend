// src/pages/author/SubmissionDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, ChevronLeft, FileUp, CheckCircle, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../shared/ui/Input';
import { TextArea } from '../../shared/ui/TextArea';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Bagde';
import { Card } from '../../shared/ui/Card';
import { PageHeader } from '../../shared/ui/PageHeader';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Skeleton } from '../../shared/ui/Skeleton';
import { cn } from '../../shared/lib/utils';
import { submissionApi } from '../../entities/submission/api/submission.api';
import { submissionFormSchema, type SubmissionFormData } from '../../features/submission/model/schemas';
// import type { CoAuthor } from '../../entities/submission/model/types';

// Расширенная схема для редактирования (без обязательного policy_accepted)
const editFormSchema = submissionFormSchema.omit({ policy_accepted: true });
type EditFormData = Omit<SubmissionFormData, 'policy_accepted'>;

export const SubmissionDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [file, setFile] = useState<File | null>(null);
    // const [currentFileName, setCurrentFileName] = useState<string>('');

    // Загрузка данных рукописи
    const { data: submission, isLoading } = useQuery({
        queryKey: ['submission', id] as const,
        queryFn: ({ queryKey }) => {
            const [_, submissionId] = queryKey;
            return submissionApi.getById(submissionId!);
        },
        enabled: !!id,
    });

    // Форма с pre-filled данными
    const { register, control, handleSubmit, formState: { errors, isDirty }, reset } = useForm<EditFormData>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
            title_ru: '',
            title_en: '',
            abstract_ru: '',
            abstract_en: '',
            keywords_ru: '',
            manuscript_language: 'ru',
            coauthors: [],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "coauthors" });

    // Заполнение формы при загрузке данных
    useEffect(() => {
        if (submission) {
            reset({
                title_ru: submission.title_ru,
                title_en: submission.title_en || '',
                abstract_ru: submission.abstract_ru,
                abstract_en: submission.abstract_en || '',
                keywords_ru: submission.keywords_ru,
                manuscript_language: 'ru',
                coauthors: submission.coauthors || [],
            });
        }
    }, [submission, reset]);

    // Мутация обновления
    const updateMutation = useMutation({
        mutationFn: async (data: EditFormData) => {
            // policy_accepted всегда true при редактировании (статья уже принята условиями)
            return submissionApi.updateSubmission(id!, { ...data, policy_accepted: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submission', id] });
            queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
            toast.success('Изменения сохранены');
        },
        onError: (error: any) => toast.error(error.message || 'Ошибка при сохранении'),
    });

    // Загрузка нового файла (опционально)
    const uploadFileMutation = useMutation({
        mutationFn: async (file: File) => {
            return submissionApi.uploadFile(id!, file);
        },
        onSuccess: () => toast.success('Файл обновлён'),
        onError: () => toast.error('Ошибка загрузки файла'),
    });

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <p className="font-serif italic text-muted-foreground">Рукопись не найдена</p>
                <Link to="/submissions" className="inline-flex items-center gap-2 mt-4 text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                    <ChevronLeft size={12} /> Вернуться к списку
                </Link>
            </div>
        );
    }

    const isPublished = submission.status === 'published';
    const isEditable = ['new', 'revision_required'].includes(submission.status);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in space-y-10">

            {/* Навигация + Статус */}
            <div className="flex items-center justify-between">
                <Link to="/submissions" className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    <ChevronLeft size={12} /> К списку рукописей
                </Link>
                <Badge variant={submission.status}>{submission.status.replace('_', ' ')}</Badge>
            </div>

            <PageHeader
                title="Редактирование рукописи"
                subtitle={`ID: ${submission.id.slice(0, 8)}`}
            />

            {/* Блокировка для опубликованных статей */}
            {isPublished && (
                <Card variant="muted" padding="md">
                    <p className="text-sm font-serif italic text-muted-foreground text-center">
                        Опубликованные статьи нельзя редактировать. Для внесения правок обратитесь в редакцию.
                    </p>
                </Card>
            )}

            {!isEditable && !isPublished && (
                <Card variant="muted" padding="md">
                    <p className="text-sm font-serif italic text-muted-foreground text-center">
                        Рукопись находится в статусе «{submission.status}». Редактирование временно недоступно.
                    </p>
                </Card>
            )}

            {isEditable && (
                <form onSubmit={handleSubmit(data => {
                    updateMutation.mutate(data);
                    if (file) uploadFileMutation.mutate(file);
                })} className="space-y-12">

                    {/* === СЕКЦИЯ 01: МЕТАДАННЫЕ === */}
                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Метаданные" prefix="01." />
                        <div className="space-y-6">
                            <Input
                                label="Заголовок (RU) *"
                                {...register('title_ru')}
                                error={errors.title_ru?.message}
                            />
                            <Input
                                label="Заголовок (EN)"
                                {...register('title_en')}
                                error={errors.title_en?.message}
                            />
                            <TextArea
                                label="Ключевые слова (RU) *"
                                placeholder="через запятую"
                                {...register('keywords_ru')}
                                error={errors.keywords_ru?.message}
                            />
                        </div>
                    </Card>

                    {/* === СЕКЦИЯ 02: АННОТАЦИЯ === */}
                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Аннотация" prefix="02." />
                        <TextArea
                            label="Аннотация (RU) *"
                            {...register('abstract_ru')}
                            error={errors.abstract_ru?.message}
                        />
                    </Card>

                    {/* === СЕКЦИЯ 03: КОЛЛЕКТИВ АВТОРОВ === */}
                    <Card padding="lg" variant="accent">
                        <div className="flex justify-between items-center mb-6">
                            <SectionHeader title="Коллектив авторов" prefix="03." className="mb-0 pb-0 border-0" />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => append({ full_name: '' })}
                            >
                                <Plus size={14} className="mr-1" /> Добавить
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <Card key={field.id} variant="muted" padding="sm" className="relative">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive p-2"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="ФИО"
                                            {...register(`coauthors.${index}.full_name`)}
                                            error={errors.coauthors?.[index]?.full_name?.message}
                                        />
                                        <Input
                                            label="Email"
                                            {...register(`coauthors.${index}.email`)}
                                            error={errors.coauthors?.[index]?.email?.message}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>

                    {/* === СЕКЦИЯ 04: РУКОПИСЬ (БЕЗ ЧЕКБОКСА) === */}
                    <Card padding="lg" variant="accent">
                        <SectionHeader title="Рукопись" prefix="04." />

                        {/* Блок загрузки файла */}
                        <div className={cn(
                            "border-2 border-dashed rounded-sm p-10 text-center transition-colors",
                            file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}>
                            {!file ? (
                                <label className="cursor-pointer block">
                                    <FileUp size={40} className="mx-auto text-muted-foreground mb-3" />
                                    <span className="text-[10px] font-accent font-bold uppercase tracking-widest">
                    Загрузить новую версию PDF
                  </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={e => {
                                            const selected = e.target.files?.[0];
                                            if (selected) setFile(selected);
                                        }}
                                    />
                                </label>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <CheckCircle size={32} className="text-primary mb-2" />
                                    <p className="font-serif italic text-sm text-foreground">{file.name}</p>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-[9px] font-bold uppercase text-primary hover:underline mt-2"
                                    >
                                        Отменить
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Инфо о текущем файле */}
                        <div className="mt-6 p-4 bg-muted/30 border border-border rounded-sm">
                            <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                Текущий файл:
                            </p>
                            <p className="text-sm font-serif italic text-foreground">
                                manuscript_{submission.id.slice(0, 6)}.pdf
                            </p>
                        </div>

                        {/* ⚠️ ЧЕКБОКС СОГЛАШИЯ УБРАН — он не нужен при редактировании */}
                    </Card>

                    {/* Кнопки */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/submissions')}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isDirty && !file || updateMutation.isPending || uploadFileMutation.isPending}
                            isLoading={updateMutation.isPending || uploadFileMutation.isPending}
                        >
                            <Save size={16} className="mr-2" /> Сохранить изменения
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};
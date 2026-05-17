// src/pages/author/CreateSubmissionPage.tsx
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Save, Plus, Trash2, FileUp, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '../../shared/ui/Input';
import { TextArea } from '../../shared/ui/TextArea';
import { Button } from '../../shared/ui/Button';
import { submissionFormSchema, type SubmissionFormData } from '../../features/submission/model/schemas';
import { submissionApi } from '../../entities/submission/api/submission.api';
import { cn } from "../../shared/lib/utils.ts";
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { PageContainer } from "../../shared/ui/PageContainer.tsx";

export const CreateSubmissionPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm<SubmissionFormData>({
        resolver: zodResolver(submissionFormSchema),
        defaultValues: { manuscript_language: isRu ? 'ru' : 'en', coauthors: [], policy_accepted: false }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "coauthors" });

    const createMutation = useMutation({
        mutationFn: async (data: SubmissionFormData) => {
            if (!file) throw new Error(isRu ? "Пожалуйста, загрузите файл рукописи" : "Please upload a manuscript file");
            const submission = await submissionApi.create(data);
            await submissionApi.uploadFile(submission.id, file);
            return submission;
        },
        onSuccess: () => {
            toast.success(isRu ? "Рукопись успешно отправлена" : "Manuscript submitted successfully");
            navigate('/submissions');
        },
        onError: (error: any) => toast.error(error.message || (isRu ? "Ошибка при отправке" : "Submission error"))
    });

    return (
        <PageContainer>
            <PageHeader
                title={t('nav.submit')}
                subtitle="New Manuscript Submission"
            />

            <form onSubmit={handleSubmit(data => createMutation.mutate(data))} className="space-y-12">

                {/* === СЕКЦИЯ 01: МЕТАДАННЫЕ === */}
                <Card padding="lg" variant="accent">
                    <SectionHeader title={t('submission.form.metadata')} prefix="01." />
                    <div className="space-y-6">
                        <Input
                            label={`${t('submission.form.title_ru')} *`}
                            {...register('title_ru')}
                            error={errors.title_ru?.message}
                        />
                        <Input
                            label={t('submission.form.title_en')}
                            {...register('title_en')}
                            error={errors.title_en?.message}
                        />
                        <TextArea
                            label={`${t('submission.form.keywords_ru')} *`}
                            placeholder={isRu ? "через запятую" : "comma separated"}
                            {...register('keywords_ru')}
                            error={errors.keywords_ru?.message}
                        />
                        <TextArea
                            label={t('submission.form.keywords_en')}
                            placeholder={isRu ? "через запятую" : "comma separated"}
                            {...register('keywords_en')}
                            error={errors.keywords_en?.message}
                        />
                    </div>
                </Card>

                {/* === СЕКЦИЯ 02: АННОТАЦИЯ === */}
                <Card padding="lg" variant="accent">
                    <SectionHeader title={t('submission.form.abstract_ru')} prefix="02." />
                    <div className="space-y-6">
                        <TextArea
                            label={`${t('submission.form.abstract_ru')} *`}
                            {...register('abstract_ru')}
                            error={errors.abstract_ru?.message}
                        />
                        <TextArea
                            label={t('submission.form.abstract_en')}
                            {...register('abstract_en')}
                            error={errors.abstract_en?.message}
                        />
                    </div>
                </Card>

                {/* === СЕКЦИЯ 03: КОЛЛЕКТИВ АВТОРОВ === */}
                <Card padding="lg" variant="accent">
                    <div className="flex justify-between items-center mb-6">
                        <SectionHeader title={t('submission.form.authors')} prefix="03." className="mb-0 pb-0 border-0" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => append({ full_name: '' })}
                        >
                            <Plus size={14} className="mr-1" /> {isRu ? 'Добавить' : 'Add'}
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
                                        label={t('auth.last_name') + ' ' + t('auth.first_name')}
                                        {...register(`coauthors.${index}.full_name`)}
                                        error={errors.coauthors?.[index]?.full_name?.message}
                                    />
                                    <Input
                                        label={t('auth.email')}
                                        {...register(`coauthors.${index}.email`)}
                                        error={errors.coauthors?.[index]?.email?.message}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>

                {/* === СЕКЦИЯ 04: РУКОПИСЬ === */}
                <Card padding="lg" variant="accent">
                    <SectionHeader title={t('submission.form.file')} prefix="04." />

                    <div className={cn(
                        "border-2 border-dashed rounded-sm p-10 text-center transition-colors",
                        file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}>
                        {!file ? (
                            <label className="cursor-pointer block">
                                <FileUp size={40} className="mx-auto text-muted-foreground mb-3" />
                                <span className="text-[10px] font-accent font-bold uppercase tracking-widest">
                                    {isRu ? 'Выберите файл статьи' : 'Choose article file'}
                                </span>
                                <p className="mt-2 text-xs font-serif text-muted-foreground">
                                    {isRu ? 'Поддерживаемые форматы: PDF, DOC, DOCX' : 'Supported formats: PDF, DOC, DOCX'}
                                </p>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={e => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                        ) : (
                            <div className="flex flex-col items-center">
                                <CheckCircle size={32} className="text-primary mb-2" />
                                <p className="font-serif text-sm text-foreground">{file.name}</p>
                                <button onClick={() => setFile(null)} className="text-[9px] font-bold uppercase text-primary hover:underline mt-2">
                                    {isRu ? 'Заменить' : 'Replace'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Чекбокс подтверждения */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 mt-6 rounded-sm">
                        <input
                            type="checkbox"
                            {...register('policy_accepted')}
                            className="mt-1 accent-primary"
                        />
                        <label className="text-[11px] leading-relaxed text-muted-foreground font-serif">
                            {t('submission.form.policy')}
                        </label>
                    </div>
                    {errors.policy_accepted && (
                        <p className="text-[10px] text-destructive font-bold uppercase mt-2">
                            {errors.policy_accepted.message}
                        </p>
                    )}
                </Card>

                {/* Кнопка отправки */}
                <div className="flex justify-center pt-6">
                    <Button
                        type="submit"
                        size="lg"
                        className="px-12"
                        isLoading={createMutation.isPending}
                    >
                        <Save size={18} className="mr-2" /> {t('common.send')}
                    </Button>
                </div>
            </form>
        </PageContainer>
    );
};
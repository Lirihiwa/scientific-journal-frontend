import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { Button } from '../../components/ui/Button';
import { FileUploader } from '../../components/ui/FileUploader';
import { submissionFormSchema, type SubmissionFormData } from '../../features/submission/submission.types';
import { submissionApi } from '../../features/submission/submission.api';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { PageContainer } from "../../components/ui/PageContainer";

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

                <Card padding="lg" variant="accent">
                    <SectionHeader title={t('submission.form.file')} prefix="04." />

                    <div className="mt-4">
                        <FileUploader
                            file={file}
                            onFileChange={setFile}
                            isLoading={createMutation.isPending}
                        />
                    </div>

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
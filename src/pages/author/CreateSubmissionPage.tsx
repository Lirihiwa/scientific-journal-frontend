import { Plus, Trash2, Save } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { useCreateSubmission } from '../../features/submission/hooks/useCreateSubmission';
import { FormInput } from '../../components/ui/FormInput';
import { FormTextArea } from '../../components/ui/FormTextArea';
import { Button } from '../../components/ui/Button';
import { FileUploader } from '../../components/ui/FileUploader';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { PageContainer } from "../../components/ui/PageContainer";

export const CreateSubmissionPage = () => {
    const {
        methods,
        fields,
        append,
        remove,
        file,
        setFile,
        createMutation,
        t,
        isRu
    } = useCreateSubmission();

    const { handleSubmit, formState: { errors } } = methods;

    return (
        <PageContainer>
            <PageHeader
                title={t('nav.submit')}
                subtitle="New Manuscript Submission"
            />

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(data => createMutation.mutate(data))} className="space-y-12">
                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.metadata')} prefix="01." />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-6">
                            <FormInput
                                name="title_ru"
                                label={`${t('submission.form.title_ru')} *`}
                            />
                            <FormInput
                                name="title_en"
                                label={t('submission.form.title_en')}
                            />
                            <FormTextArea
                                name="keywords_ru"
                                label={`${t('submission.form.keywords_ru')} *`}
                                placeholder={isRu ? "через запятую" : "comma separated"}
                            />
                            <FormTextArea
                                name="keywords_en"
                                label={t('submission.form.keywords_en')}
                                placeholder={isRu ? "через запятую" : "comma separated"}
                            />
                        </div>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.abstract')} prefix="02." />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-6">
                            <FormTextArea
                                name="abstract_ru"
                                label={`${t('submission.form.abstract_ru')} *`}
                            />
                            <FormTextArea
                                name="abstract_en"
                                label={t('submission.form.abstract_en')}
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
                        <div className="space-y-4 max-w-4xl">
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
                                        <FormInput
                                            name={`coauthors.${index}.full_name`}
                                            label={t('auth.last_name') + ' ' + t('auth.first_name')}
                                        />
                                        <FormInput
                                            name={`coauthors.${index}.email`}
                                            label={t('auth.email')}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.file')} prefix="04." />

                        <div className="mt-6 max-w-2xl">
                            <FileUploader
                                file={file}
                                onFileChange={setFile}
                                isLoading={createMutation.isPending}
                            />
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-muted/50 mt-6 rounded-sm max-w-2xl">
                            <input
                                type="checkbox"
                                {...methods.register('policy_accepted')}
                                className="mt-1 accent-primary"
                            />
                            <label className="text-[11px] leading-relaxed text-muted-foreground font-serif">
                                {t('submission.form.policy')}
                            </label>
                        </div>
                        {errors.policy_accepted && (
                            <p className="text-[10px] text-destructive font-bold uppercase mt-2">
                                {errors.policy_accepted.message as string}
                            </p>
                        )}
                    </Card>

                    <div className="flex justify-end pt-6 border-t border-border/30">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full sm:w-auto px-12"
                            isLoading={createMutation.isPending}
                        >
                            <Save size={18} className="mr-2" /> {t('common.send')}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </PageContainer>
    );
};
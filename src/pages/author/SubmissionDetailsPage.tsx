import { ChevronLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubmissionDetails } from '../../features/submission/hooks/useSubmissionDetails';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Skeleton } from '../../components/ui/Skeleton';
import { FileUploader } from '../../components/ui/FileUploader';
import { SubmissionTimeline } from '../../features/submission/components/SubmissionTimeline';
import { PageContainer } from "../../components/ui/PageContainer";

export const SubmissionDetailsPage = () => {
    const {
        // id,
        submission,
        isLoading,
        file,
        setFile,
        uploadFileMutation,
        t,
        isRu
    } = useSubmissionDetails();

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
                <p className="font-serif text-muted-foreground">
                    {isRu ? 'Рукопись не найдена' : 'Manuscript not found'}
                </p>
                <Link to="/submissions" className="inline-flex items-center gap-2 mt-4 text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                    <ChevronLeft size={12} /> {t('common.back')}
                </Link>
            </div>
        );
    }

    const isEditable = ['new', 'revision_required'].includes(submission.status);
    const displayAbstract = isRu ? submission.abstract_ru : (submission.abstract_en || submission.abstract_ru);

    return (
        <PageContainer className="space-y-10">
            <div className="flex items-center justify-between">
                <Link to="/submissions" className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    <ChevronLeft size={12} /> {isRu ? 'К списку рукописей' : 'Back to list'}
                </Link>
                <Badge variant={submission.status}>
                    {t(`submission.status.${submission.status}`)}
                </Badge>
            </div>

            <PageHeader
                title={isRu ? "Данные рукописи" : "Manuscript Details"}
                subtitle={`ID: ${submission.id.slice(0, 8)}`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-10">

                    {!isEditable && (
                        <Card variant="muted" padding="md" className="flex items-center gap-3">
                            <Info className="text-primary shrink-0" size={24} />
                            <p className="text-sm font-serif text-muted-foreground">
                                {isRu
                                    ? `Рукопись находится в статусе «${t(`submission.status.${submission.status}`)}». Внесение изменений невозможно.`
                                    : `Manuscript is in "${t(`submission.status.${submission.status}`)}" status. No changes allowed.`
                                }
                            </p>
                        </Card>
                    )}

                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.metadata')} prefix="01." />
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">{t('submission.form.title_ru')}</p>
                                <p className="text-base font-serif text-foreground">{submission.title_ru}</p>
                            </div>
                            {submission.title_en && (
                                <div>
                                    <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">{t('submission.form.title_en')}</p>
                                    <p className="text-base font-serif text-foreground">{submission.title_en}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-[10px] font-accent font-bold uppercase text-muted-foreground">{t('submission.form.keywords_ru')}</p>
                                <p className="text-sm font-serif text-foreground">{isRu ? submission.keywords_ru : (submission.keywords_en || submission.keywords_ru)}</p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.abstract_ru').split(' (')[0]} prefix="02." />
                        <p className="text-sm font-serif text-foreground leading-relaxed text-justify">
                            {displayAbstract}
                        </p>
                    </Card>

                    <Card padding="lg" variant="accent">
                        <SectionHeader title={t('submission.form.file')} prefix="03." />
                        <div className="p-4 bg-muted/30 border border-border rounded-sm mb-6">
                            <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                {isRu ? 'Текущая версия:' : 'Current version:'}
                            </p>
                            <p className="text-sm font-serif text-foreground">{submission.submitted_file_name || (isRu ? "Файл не загружен" : "No file uploaded")}</p>
                        </div>

                        {isEditable && (
                            <FileUploader
                                file={file}
                                onFileChange={setFile}
                                isLoading={uploadFileMutation.isPending}
                                onSave={() => uploadFileMutation.mutate(file!)}
                            />
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-1 sticky top-24">
                    <SubmissionTimeline events={submission.events || []} />
                </div>
            </div>

        </PageContainer>
    );
};
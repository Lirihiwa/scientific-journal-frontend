// src/pages/public/ArchivePage.tsx
import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { journalApi } from '../../entities/journal/api/journal.api';
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { Skeleton } from '../../shared/ui/Skeleton';
import { PageContainer } from "../../shared/ui/PageContainer";
import { Badge } from '../../shared/ui/Bagde';

export const ArchivePage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const { data: volumes, isLoading } = useQuery({
        queryKey: ['volumes'],
        queryFn: journalApi.getVolumes
    });

    if (isLoading) {
        return (
            <PageContainer spacing="md">
                <Skeleton className="h-24 w-full mb-10" />
                <div className="space-y-8">
                    {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-48 w-full" />
                    ))}
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={t('journal.archive_title')}
                subtitle="Scientific Journal Archive"
            />

            <div className="space-y-12">
                {volumes?.map((vol) => (
                    <section key={vol.id} className="space-y-6">
                        {/* Заголовок тома */}
                        <div className="flex items-end gap-4 border-b border-border pb-3">
                            <h2 className="text-2xl font-heading font-bold text-foreground leading-none">
                                {isRu ? `Том ${vol.number}` : `Volume ${vol.number}`}
                            </h2>
                            <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                                {isRu ? 'Год издания' : 'Year'}: {vol.year}
                            </span>
                        </div>

                        {/* Список выпусков */}
                        <IssuesList volumeId={vol.id} />
                    </section>
                ))}
            </div>

            {/* Пустое состояние */}
            {volumes?.length === 0 && (
                <Card variant="muted" padding="lg" className="text-center py-16">
                    <FileText size={40} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                        {isRu ? 'Архив пуст' : 'Archive is empty'}
                    </h3>
                    <p className="text-sm font-serif text-muted-foreground">
                        {isRu
                            ? 'Выпуски журнала пока не опубликованы.'
                            : 'Journal issues have not been published yet.'}
                    </p>
                </Card>
            )}
        </PageContainer>
    );
};

// Вспомогательный компонент списка выпусков
const IssuesList = ({ volumeId }: { volumeId: string }) => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const { data: issues, isLoading } = useQuery({
        queryKey: ['issues', volumeId],
        queryFn: () => journalApi.getIssues(volumeId)
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues?.map((issue) => (
                <Link key={issue.id} to={`/issues/${issue.id}`} className="group block h-full">
                    <Card variant="interactive" padding="md" className="h-full flex flex-col">

                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                                <span className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                    №{issue.number}
                                </span>
                            </div>

                            <Badge variant="published">
                                {t('submission.status.published')}
                            </Badge>
                        </div>

                        <div className="flex-grow space-y-2">
                            <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                {issue.title || (isRu ? `Выпуск ${issue.number}` : `Issue ${issue.number}`)}
                            </h3>

                            <div className="flex items-center gap-1.5 text-[10px] font-accent font-bold uppercase tracking-wide text-muted-foreground">
                                <Calendar size={12} className="text-primary/70" />
                                {issue.publication_date
                                    ? new Date(issue.publication_date).toLocaleDateString(isRu ? 'ru-RU' : 'en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                    : t('common.not_found')}
                            </div>

                            {issue.description && (
                                <p className="text-sm font-serif text-muted-foreground line-clamp-2 pt-2">
                                    {issue.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                            <div className="flex items-center gap-1.5 text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                                <BookOpen size={12} />
                                {isRu ? 'Открытый доступ' : 'Open Access'}
                            </div>
                            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>

                    </Card>
                </Link>
            ))}
        </div>
    );
};
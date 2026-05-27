import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { journalApi } from '../../features/journal/journal.api';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { PageContainer } from "../../components/ui/PageContainer";
import { Badge } from '../../components/ui/Badge';

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
                        <div className="flex items-end gap-4 border-b border-border/80 pb-3">
                            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground leading-none">
                                {isRu ? `Том ${vol.number}` : `Volume ${vol.number}`}
                            </h2>
                            <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                                {isRu ? 'Год издания' : 'Year'}: {vol.year}
                            </span>
                        </div>

                        <IssuesList volumeId={vol.id} />
                    </section>
                ))}
            </div>

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
                    <Card variant="interactive" padding="sm" className="h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 bg-muted border border-border/60 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors rounded-sm">
                                        <span className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                            №{issue.number}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight break-words">
                                            {issue.title || (isRu ? `Выпуск ${issue.number}` : `Issue ${issue.number}`)}
                                        </h3>
                                    </div>
                                </div>

                                <Badge variant="published" className="shrink-0 mt-0.5">
                                    {t('submission.status.published')}
                                </Badge>
                            </div>

                            <div className="space-y-1.5">
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
                                    <p className="text-xs font-serif text-muted-foreground line-clamp-2 pt-1 leading-normal">
                                        {issue.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-border/40">
                            <div className="flex items-center gap-1.5 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                                <BookOpen size={11} />
                                {isRu ? 'Открытый доступ' : 'Open Access'}
                            </div>
                            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
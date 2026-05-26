import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Calendar } from 'lucide-react';
import { journalApi } from '../../features/journal/journal.api';
import { PublicationCard } from '../../features/journal/components/PublicationCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { PageContainer } from "../../components/ui/PageContainer";

export const IssuePage = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const { data: issue, isLoading: issueLoading } = useQuery({
        queryKey: ['issue', id],
        queryFn: () => journalApi.getIssueDetails(id!),
        enabled: !!id,
    });

    const { data: publications, isLoading: pubsLoading } = useQuery({
        queryKey: ['issue-publications', id],
        queryFn: () => journalApi.getIssuePublications(id!),
        enabled: !!id,
    });

    if (issueLoading || pubsLoading) {
        return (
            <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-32 w-full" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <PageContainer className="space-y-10">
            <Link
                to="/archive"
                className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
                <ChevronLeft size={12} />
                {t('nav.archive')}
            </Link>

            <header className="p-8 bg-card border border-border">
                <div className="space-y-4">
                    <p className="text-[9px] font-accent font-bold uppercase tracking-[0.4em] text-primary">
                        {isRu ? 'Научный выпуск' : 'Scientific Issue'}
                    </p>
                    <h1 className="text-3xl font-heading font-bold text-foreground">
                        {isRu ? `Выпуск №${issue?.number}` : `Issue №${issue?.number}`}
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-serif text-muted-foreground pt-4 border-t border-border">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            {issue?.publication_date
                                ? new Date(issue.publication_date).getFullYear()
                                : ''}
                        </span>
                        <span>·</span>
                        <span>
                            {publications?.length || 0} {isRu ? 'статей' : 'articles'}
                        </span>
                    </div>
                </div>
            </header>

            <section className="space-y-6">
                <h3 className="text-[9px] font-accent font-bold uppercase tracking-[0.3em] text-primary pb-2 border-b-2 border-primary w-fit">
                    {isRu ? 'Содержание' : 'Contents'}
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {publications?.map((pub) => (
                            <PublicationCard
                                key={pub.id}
                                pub={pub}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </PageContainer>
    );
};
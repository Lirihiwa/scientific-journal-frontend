// src/pages/public/HomePage.tsx
import { useQuery } from '@tanstack/react-query';
import { journalApi } from '../../entities/journal/api/journal.api';
import { Skeleton } from '../../shared/ui/Skeleton';
import { PublicationCard } from '../../widgets/publication/ui/PublicationCard';

export const HomePage = () => {
    const { data: current, isLoading } = useQuery({
        queryKey: ['current-issue'],
        queryFn: journalApi.getCurrentIssue,
    });

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 animate-fade-in">

            {/* Заголовок выпуска */}
            <header className="mb-8 pb-6 border-b border-border">
                <p className="text-[9px] font-accent font-bold uppercase tracking-[0.3em] text-muted-foreground mb-1">
                    Текущий выпуск
                </p>
                <div className="flex items-end justify-between gap-4">
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                        №{current?.issue.number} · {current?.issue.publication_date
                        ? new Date(current.issue.publication_date).getFullYear()
                        : ''}
                    </h1>
                    <span className="text-[10px] font-accent font-bold uppercase tracking-tight text-muted-foreground">
            {current?.publications.length} статей
          </span>
                </div>
                {current?.issue.description && (
                    <p className="mt-4 text-sm font-serif italic text-muted-foreground leading-relaxed">
                        {current.issue.description}
                    </p>
                )}
            </header>

            {/* Единая лента статей */}
            <section className="space-y-4">
                {current?.publications.map((pub) => (
                    <PublicationCard
                        key={pub.id}
                        pub={pub}
                        variant="list"
                        showStatus
                        status="published"
                    />
                ))}
            </section>

            {/* Пустое состояние */}
            {current?.publications.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-border bg-card/50">
                    <p className="font-serif italic text-muted-foreground">
                        В текущем выпуске пока нет опубликованных статей
                    </p>
                </div>
            )}
        </div>
    );
};
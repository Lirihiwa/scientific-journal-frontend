// src/pages/public/IssuesPage.tsx
import { useQuery } from '@tanstack/react-query';
import { Calendar, ChevronRight, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { journalApi } from '../../entities/journal/api/journal.api';
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { Skeleton } from '../../shared/ui/Skeleton';

export const ArchivePage = () => {
    const { data: volumes, isLoading } = useQuery({
        queryKey: ['volumes'],
        queryFn: journalApi.getVolumes
    });

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto py-12 px-4">
                <Skeleton className="h-8 w-64 mx-auto mb-12" />
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 animate-fade-in space-y-12">

            {/* Заголовок страницы */}
            <PageHeader
                title="Выпуски журнала"
                subtitle="Journal Issues"
                className="text-center border-b-0 pb-4 mb-12"
            />

            {/* Список томов и выпусков */}
            <div className="space-y-10">
                {volumes?.map((vol) => (
                    <section key={vol.id} className="space-y-6">
                        {/* Заголовок тома */}
                        <div className="flex items-center gap-4 border-b-2 border-border pb-3">
                            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-sm">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-heading font-bold text-foreground">
                                    Том {vol.number}
                                </h2>
                                <p className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                                    Year {vol.year}
                                </p>
                            </div>
                        </div>

                        {/* Список выпусков в томе */}
                        <IssuesList volumeId={vol.id} />
                    </section>
                ))}
            </div>

            {/* Пустое состояние */}
            {volumes?.length === 0 && (
                <Card variant="muted" padding="lg" className="text-center">
                    <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                        Выпуски пока не созданы
                    </h3>
                    <p className="text-sm font-serif text-muted-foreground">
                        Редакция журнала ещё не опубликовала ни одного выпуска
                    </p>
                </Card>
            )}
        </div>
    );
};

// Компонент списка выпусков для одного тома
const IssuesList = ({ volumeId }: { volumeId: string }) => {
    const { data: issues, isLoading } = useQuery({
        queryKey: ['issues', volumeId],
        queryFn: () => journalApi.getIssues(volumeId)
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-32" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issues?.map((issue) => (
                <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    className="group relative p-6 bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all rounded-sm"
                >
                    <div className="flex items-start justify-between gap-4">
                        {/* Номер выпуска */}
                        <div className="flex items-center gap-4 flex-grow">
                            <div className="w-14 h-14 bg-muted border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-colors shrink-0">
                <span className="text-lg font-heading font-bold text-primary">
                  №{issue.number}
                </span>
                            </div>

                            <div className="space-y-2 flex-grow min-w-0">
                                <h3 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    Выпуск {issue.number}
                                </h3>

                                <div className="flex items-center gap-3 text-[10px] font-accent font-bold uppercase tracking-tight text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                      {new Date(issue.publication_date).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                      })}
                  </span>
                                </div>

                                {issue.description && (
                                    <p className="text-xs font-serif text-muted-foreground line-clamp-2">
                                        {issue.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Иконка стрелки */}
                        <ChevronRight
                            size={18}
                            className="text-border group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                        />
                    </div>

                    {/* Бейдж "Текущий" (опционально, если нужно выделить текущий выпуск) */}
                    {/* Можно добавить логику для определения текущего выпуска */}
                </Link>
            ))}
        </div>
    );
};
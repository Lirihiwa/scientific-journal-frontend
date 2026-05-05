// src/pages/author/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { Plus, Clock, ArrowRight, FileX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { submissionApi } from '../../entities/submission/api/submission.api';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Bagde';
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { SkeletonList } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/EmptyState';

export const DashboardPage = () => {
    const { data: submissions, isLoading } = useQuery({
        queryKey: ['my-submissions'],
        queryFn: submissionApi.getMySubmissions
    });

    return (
        <div className="space-y-10 animate-fade-in">
            <PageHeader
                title="Кабинет автора"
                subtitle="Manuscript Management System"
                action={<Link to="/submissions/new"><Button><Plus size={16} className="mr-2" /> Подать статью</Button></Link>}
            />
            <div className="space-y-4">
                {isLoading ? (
                    <SkeletonList count={3} className="h-32" />
                ) : submissions?.length ? (
                    submissions.map((sub) => (
                        <Card key={sub.id} variant="interactive" padding="lg" className="group">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-3 flex-grow">
                                    <div className="flex items-center gap-4">
                                        <Badge variant={sub.status}>{sub.status.replace('_', ' ')}</Badge>
                                        <span className="text-[10px] font-accent font-bold text-muted-foreground flex items-center gap-1 uppercase">
                      <Clock size={12} /> {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold italic text-foreground group-hover:text-primary transition-colors">{sub.title_ru}</h3>
                                </div>
                                <Link to={`/submissions/${sub.id}`}>
                                    <Button variant="outline" size="icon" className="rounded-full hover:scale-110 transition-transform"><ArrowRight size={20} /></Button>
                                </Link>
                            </div>
                        </Card>
                    ))
                ) : (
                    <EmptyState
                        title="Список ваших рукописей пока пуст"
                        description="Подайте первую статью, чтобы начать публикационный процесс."
                        icon={<FileX size={48} />}
                        action={<Link to="/submissions/new"><Button>Подать статью</Button></Link>}
                    />
                )}
            </div>
        </div>
    );
};
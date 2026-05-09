// src/pages/public/HomePage.tsx
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Info, FileText, Users, BookOpen, Scale, Send, Fingerprint } from 'lucide-react';
import { journalApi } from '../../entities/journal/api/journal.api';
import {Skeleton, SkeletonList} from '../../shared/ui/Skeleton';
import { PublicationCard } from '../../widgets/publication/ui/PublicationCard';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';

export const HomePage = () => {
    const { data: current, isLoading } = useQuery({
        queryKey: ['current-issue'],
        queryFn: journalApi.getCurrentIssue,
    });

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <SkeletonList count={3} />
                </div>
                <Skeleton className="lg:col-span-1 h-96" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12 animate-fade-in">

            {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
            <div className="lg:col-span-3 space-y-12">

                {/* 3.1.1 Информация о журнале */}
                <section className="bg-card border border-border border-t-4 border-t-primary shadow-sm p-8 rounded-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-48 h-64 bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground/40 font-serif">
                            Обложка журнала
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-heading font-bold text-foreground leading-tight">
                                Вестник Челябинского государственного университета
                            </h1>
                            <div className="flex gap-3">
                                <span className="px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 text-[10px] font-accent font-bold uppercase tracking-widest rounded-sm">ISSN: 1994-2796</span>
                            </div>
                            <p className="font-serif text-sm leading-relaxed text-muted-foreground text-justify">
                                Научный журнал, в котором публикуются результаты диссертационных исследований.
                                Издание включено в Перечень рецензируемых научных изданий (ВАК РФ).
                                Журнал является открытым для международного научного сообщества.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3.1.1 Список последних 3 статей */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                        <h2 className="text-xl font-heading font-bold text-foreground">Текущий выпуск</h2>
                        <Link to="/archive" className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">Все выпуски →</Link>
                    </div>

                    <div className="space-y-4">
                        {current?.publications.slice(0, 3).map((pub) => (
                            <PublicationCard key={pub.id} pub={pub} />
                        ))}
                    </div>
                </section>
            </div>

            {/* ПРАВАЯ КОЛОНКА (3.1.1) */}
            <aside className="lg:col-span-1 space-y-6">
                <Link to="/submissions/new">
                    <Button size="lg" className="w-full shadow-md"><Send size={16} className="mr-2" /> Подать статью</Button>
                </Link>

                <Card padding="none" className="overflow-hidden">
                    <div className="p-4 bg-muted/50 border-b border-border text-[10px] font-accent font-bold uppercase tracking-widest">Информация</div>
                    <div className="flex flex-col">
                        {[
                            { to: '/about', icon: Info, label: 'О журнале' },
                            { to: '/info/guidelines', icon: FileText, label: 'Для авторов' },
                            { to: '/editorial', icon: Users, label: 'Ред. коллегия' },
                            { to: '/review-process', icon: BookOpen, label: 'Рецензирование' },
                            { to: '/ethics', icon: Scale, label: 'Этика публикаций' },
                        ].map(link => (
                            <Link key={link.to} to={link.to} className="flex items-center gap-3 p-4 text-sm font-serif hover:bg-primary/5 hover:text-primary transition-colors border-b border-border last:border-0">
                                <link.icon size={16} className="text-muted-foreground" /> {link.label}
                            </Link>
                        ))}
                    </div>
                </Card>

                <Card variant="muted" className="text-center opacity-60">
                    <Fingerprint size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-[9px] font-accent font-bold uppercase tracking-widest">Crossref / DOI</p>
                </Card>
            </aside>
        </div>
    );
};
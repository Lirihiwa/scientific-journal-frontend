import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Info, FileText, Users, BookOpen, Scale, Send, Fingerprint } from 'lucide-react';
import { journalApi } from '../../features/journal/journal.api';
import { Skeleton, SkeletonList } from '../../components/ui/Skeleton';
import { PublicationCard } from '../../features/journal/components/PublicationCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PageContainer } from "../../components/ui/PageContainer";

export const HomePage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

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
        <PageContainer className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
                <section className="bg-card border border-border border-t-4 border-t-primary shadow-sm p-6 rounded-sm">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="w-36 h-48 md:w-40 md:h-52 bg-muted border border-border/60 flex items-center justify-center shrink-0 text-muted-foreground/40 font-serif text-center p-3 text-xs">
                            {isRu ? 'Обложка журнала' : 'Journal Cover'}
                        </div>
                        <div className="space-y-3 flex-grow">
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                                {isRu
                                    ? 'Журнал Челябинского государственного университета'
                                    : 'Bulletin of Chelyabinsk State University'}
                            </h1>
                            <div className="flex gap-3">
                                <span className="px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 text-[10px] font-accent font-bold uppercase tracking-widest rounded-sm">
                                    {t('journal.issn')}: 1994-2796
                                </span>
                            </div>
                            <p className="font-serif text-xs md:text-sm leading-relaxed text-muted-foreground text-justify">
                                {isRu ? (
                                    "Научный журнал, в котором публикуются результаты диссертационных исследований. Издание включено в Перечень рецензируемых научных изданий (ВАК РФ). Журнал является открытым для международного научного сообщества."
                                ) : (
                                    "A peer-reviewed scientific journal publishing the results of dissertation research. The publication is included in the List of peer-reviewed scientific editions (VAK RF). The journal is open to the international scientific community."
                                )}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                        <h2 className="text-xl font-heading font-bold text-foreground">
                            {t('journal.current_issue')}
                        </h2>
                        <Link to="/archive" className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                            {isRu ? 'Все выпуски' : 'All issues'} →
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {current?.publications?.slice(0, 3).map((pub) => (
                            <PublicationCard key={pub.id} pub={pub} />
                        ))}
                    </div>
                </section>
            </div>

            <aside className="lg:col-span-1 space-y-6">
                <Link to="/submissions/new" className="block">
                    <Button size="lg" className="w-full shadow-md">
                        <Send size={16} className="mr-2" />
                        {t('nav.submit')}
                    </Button>
                </Link>

                <Card padding="none" className="overflow-hidden">
                    <div className="p-4 bg-muted/50 border-b border-border text-[10px] font-accent font-bold uppercase tracking-widest">
                        {isRu ? 'Информация' : 'Information'}
                    </div>
                    <div className="flex flex-col">
                        {[
                            { to: '/about', icon: Info, label: t('nav.about') },
                            { to: '/info/guidelines', icon: FileText, label: t('nav.guidelines') },
                            { to: '/editorial', icon: Users, label: t('nav.editorial') },
                            { to: '/review-process', icon: BookOpen, label: isRu ? 'Рецензирование' : 'Peer Review' },
                            { to: '/ethics', icon: Scale, label: t('nav.ethics') },
                        ].map(link => (
                            <Link key={link.to} to={link.to} className="flex items-center gap-3 p-4 text-sm font-serif hover:bg-primary/5 hover:text-primary transition-colors border-b border-border last:border-0">
                                <link.icon size={16} className="text-muted-foreground" /> {link.label}
                            </Link>
                        ))}
                    </div>
                </Card>

                <Card variant="muted" className="text-center opacity-60">
                    <Fingerprint size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-[9px] font-accent font-bold uppercase tracking-widest">
                        Crossref / {t('journal.doi')}
                    </p>
                </Card>
            </aside>
        </PageContainer>
    );
};
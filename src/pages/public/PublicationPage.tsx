import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronLeft, Download, FileText, Fingerprint, Quote } from 'lucide-react';
import { toast } from 'sonner';

import { journalApi } from '../../features/journal/journal.api';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageContainer } from "../../components/ui/PageContainer";

const MetaBlock = ({
                       title,
                       icon,
                       children,
                       className
                   }: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`space-y-3 pb-4 border-b border-border last:border-0 last:pb-0 ${className}`}>
        {title && (
            <h4 className="flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                {icon}
                {title}
            </h4>
        )}
        <div className="text-[11px] text-foreground">
            {children}
        </div>
    </div>
);

export const PublicationPage = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const { data: pub, isLoading } = useQuery({
        queryKey: ['publication', id],
        queryFn: () => journalApi.getPublication(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!pub) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <p className="font-serif text-muted-foreground">
                    {isRu ? 'Статья не найдена' : 'Publication not found'}
                </p>
                <Link to="/archive"
                      className="inline-flex items-center gap-2 mt-4 text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                    <ChevronLeft size={12} /> {t('common.back')}
                </Link>
            </div>
        );
    }

    const year = pub.published_at ? new Date(pub.published_at).getFullYear() : '';
    const displayTitle = isRu ? pub.title_ru : (pub.title_en || pub.title_ru);
    const displayAbstract = isRu ? pub.abstract_ru : (pub.abstract_en || pub.abstract_ru);
    const displayKeywords = isRu ? pub.keywords_ru : (pub.keywords_en || pub.keywords_ru);

    const issueInfo = isRu ? `№1 · ${year}` : `Issue 1 · ${year}`;

    const handleCopyCitation = () => {
        const citation = `${pub.authors[0]?.author_id} (${year}). ${displayTitle}. ${isRu ? 'Вестник ЧелГУ' : 'CSU Bulletin'}, ${issueInfo}.`;
        navigator.clipboard.writeText(citation);
        toast.success(isRu ? "Скопировано в буфер" : "Copied to clipboard");
    };

    return (
        <PageContainer>
            <nav className="mb-6 pb-4 border-b border-border">
                <Link
                    to="/archive"
                    className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft size={12} />
                    {t('nav.archive')}
                </Link>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <article className="lg:col-span-2 space-y-8">
                    <header className="space-y-3 pb-6 border-b border-border">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="published">
                                {isRu ? 'Оригинальная статья' : 'Original Paper'}
                            </Badge>
                            <span className="text-[9px] font-accent font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1">
                                <Calendar size={10} />
                                {year}
                            </span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-foreground leading-snug">
                            {displayTitle}
                        </h1>
                        {isRu && pub.title_en && (
                            <p className="text-base font-serif text-muted-foreground italic">
                                {pub.title_en}
                            </p>
                        )}
                    </header>

                    <section className="space-y-2">
                        <h2 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                            {isRu ? 'Авторы' : 'Authors'}
                        </h2>
                        <div className="space-y-2">
                            {pub.authors.map((author, idx) => (
                                <p key={author.author_id || idx} className="text-sm font-bold text-foreground">
                                    {author.author_id}
                                    {author.is_primary && (
                                        <span className="ml-2 text-[9px] font-accent uppercase tracking-tight text-primary">
                                            [{isRu ? 'корр. автор' : 'corresponding author'}]
                                        </span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <FileText size={12} />
                            {t('submission.form.abstract_ru').split(' (')[0]}
                        </h2>
                        <p className="font-serif text-sm leading-relaxed text-foreground text-justify">
                            {displayAbstract}
                        </p>
                    </section>

                    {displayKeywords && (
                        <section className="pt-4 border-t border-border">
                            <p className="text-[10px]">
                                <span className="font-accent font-bold uppercase tracking-widest text-muted-foreground mr-2">
                                    {isRu ? 'Ключевые слова:' : 'Keywords:'}
                                </span>
                                <span className="font-serif text-foreground">
                                    {displayKeywords}
                                </span>
                            </p>
                        </section>
                    )}
                </article>

                <aside className="lg:col-span-1 space-y-6">
                    <Card variant="accent" padding="md" className="space-y-4">
                        {pub.pdf_download_allowed ? (
                            <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer" className="block">
                                <Button className="w-full h-10 text-[10px]">
                                    <Download size={14} className="mr-2" />
                                    {t('journal.download_pdf')}
                                </Button>
                            </a>
                        ) : (
                            <div className="p-3 bg-muted/50 border border-border text-center">
                                <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                                    {isRu ? 'Доступ ограничен' : 'Access restricted'}
                                </span>
                            </div>
                        )}
                    </Card>

                    <Card variant="flat" padding="md" className="space-y-4">
                        <MetaBlock title={t('journal.doi')} icon={<Fingerprint size={12} />}>
                            {pub.doi ? (
                                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="font-mono text-[10px] text-primary hover:underline break-all">
                                    {pub.doi}
                                </a>
                            ) : (
                                <span className="text-muted-foreground">—</span>
                            )}
                        </MetaBlock>

                        <MetaBlock title={isRu ? "Выпуск" : "Issue"}>
                            <p className="font-accent font-bold text-foreground">
                                {issueInfo}
                            </p>
                        </MetaBlock>

                        <MetaBlock title={isRu ? "Страницы" : "Pages"}>
                            <p className="font-accent font-bold text-foreground">12–24</p>
                        </MetaBlock>
                    </Card>

                    <Card variant="muted" padding="md" className="space-y-3">
                        <h4 className="flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-primary">
                            <Quote size={12} />
                            {t('journal.citation')}
                        </h4>
                        <p className="text-[10px] font-serif leading-relaxed text-muted-foreground">
                            {pub.authors[0]?.author_id} ({year}). {displayTitle}.{' '}
                            <span className="text-foreground font-bold">{isRu ? 'ЧелГУ' : 'CSU Bulletin'}</span>,{' '}
                            {issueInfo}, 12–24.
                        </p>
                        <button
                            className="text-[9px] font-accent font-bold uppercase tracking-widest text-primary hover:underline"
                            onClick={handleCopyCitation}
                        >
                            {t('journal.copy')}
                        </button>
                    </Card>

                    <div className="p-3 bg-muted/30 border border-border">
                        <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-2">
                            {isRu ? 'Лицензия' : 'License'}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                            {isRu ? 'Контент по лицензии' : 'Content licensed under'}{' '}
                            <span className="font-bold text-foreground">CC BY 4.0</span>
                        </p>
                    </div>
                </aside>
            </div>
        </PageContainer>
    );
};
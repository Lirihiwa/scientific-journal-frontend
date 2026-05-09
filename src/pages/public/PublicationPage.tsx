// src/pages/public/PublicationPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Download, Quote, Fingerprint, Calendar, FileText } from 'lucide-react';
import { journalApi } from '../../entities/journal/api/journal.api';
import { Button } from '../../shared/ui/Button';
import { Skeleton } from '../../shared/ui/Skeleton';
import { Card } from '../../shared/ui/Card';
import { Badge } from '../../shared/ui/Bagde';

// Вспомогательный блок для сайдбара
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
                <p className="font-serif text-muted-foreground">Статья не найдена</p>
                <Link to="/archive" className="inline-flex items-center gap-2 mt-4 text-[10px] font-accent font-bold uppercase tracking-widest text-primary hover:underline">
                    <ChevronLeft size={12} /> Вернуться в архив
                </Link>
            </div>
        );
    }

    const year = pub.published_at ? new Date(pub.published_at).getFullYear() : '';
    const issueNumber = '№' + Math.floor(Math.random() * 4) + 1; // Заглушка, пока нет связи с issue

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">

            {/* === ХЛЕБНЫЕ КРОШКИ / НАЗАД === */}
            <nav className="mb-6 pb-4 border-b border-border">
                <Link
                    to="/archive"
                    className="inline-flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft size={12} />
                    Архив выпусков
                </Link>
            </nav>

            {/* === ДВУХКОЛОНОЧНАЯ РАСКЛАДКА === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* === ЦЕНТРАЛЬНАЯ КОЛОНКА: КОНТЕНТ (2/3) === */}
                <article className="lg:col-span-2 space-y-8">

                    {/* Заголовок статьи — строгий, без гигантских шрифтов */}
                    <header className="space-y-3 pb-6 border-b border-border">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="published">Оригинальная статья</Badge>
                            <span className="text-[9px] font-accent font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-1">
                <Calendar size={10} />
                                {year}
              </span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-foreground leading-snug">
                            {pub.title_ru}
                        </h1>
                        {pub.title_en && (
                            <p className="text-base font-serif text-muted-foreground">
                                {pub.title_en}
                            </p>
                        )}
                    </header>

                    {/* Авторы */}
                    <section className="space-y-2">
                        <h2 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                            Авторы
                        </h2>
                        <div className="space-y-2">
                            {pub.authors.map((author, idx) => (
                                <p key={author.author_id || idx} className="text-sm font-bold text-foreground">
                                    {author.full_name}
                                    {author.is_primary && (
                                        <span className="ml-2 text-[9px] font-accent uppercase tracking-tight text-primary">
                      [корр. автор]
                    </span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* Аннотация */}
                    <section className="space-y-3">
                        <h2 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <FileText size={12} />
                            Аннотация
                        </h2>
                        <p className="font-serif text-sm leading-relaxed text-foreground text-justify">
                            {pub.abstract_ru}
                        </p>
                    </section>

                    {/* Ключевые слова */}
                    {pub.keywords_ru && (
                        <section className="pt-4 border-t border-border">
                            <p className="text-[10px]">
                <span className="font-accent font-bold uppercase tracking-widest text-muted-foreground mr-2">
                  Ключевые слова:
                </span>
                                <span className="font-serif text-foreground">
                  {pub.keywords_ru}
                </span>
                            </p>
                        </section>
                    )}

                </article>

                {/* === ПРАВЫЙ САЙДБАР: МЕТА-ИНФОРМАЦИЯ (1/3) === */}
                <aside className="lg:col-span-1 space-y-6">

                    {/* Блок 1: Кнопка PDF */}
                    <Card variant="accent" padding="md" className="space-y-4">
                        {pub.pdf_download_allowed ? (
                            <a
                                href={journalApi.getPdfUrl(pub.id)}
                                target="_blank"
                                rel="noreferrer"
                                className="block"
                            >
                                <Button className="w-full h-10 text-[10px]">
                                    <Download size={14} className="mr-2" />
                                    Скачать PDF
                                </Button>
                            </a>
                        ) : (
                            <div className="p-3 bg-muted/50 border border-border text-center">
                <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                  Доступ будет открыт позже
                </span>
                            </div>
                        )}
                    </Card>

                    {/* Блок 2: Идентификаторы */}
                    <Card variant="flat" padding="md" className="space-y-4">
                        <MetaBlock title="DOI" icon={<Fingerprint size={12} />}>
                            {pub.doi ? (
                                <a
                                    href={`https://doi.org/${pub.doi}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-mono text-[10px] text-primary hover:underline break-all"
                                >
                                    {pub.doi}
                                </a>
                            ) : (
                                <span className="text-muted-foreground">Не присвоен</span>
                            )}
                        </MetaBlock>

                        <MetaBlock title="Выпуск">
                            <p className="font-accent font-bold text-foreground">
                                {issueNumber} · {year}
                            </p>
                        </MetaBlock>

                        <MetaBlock title="Страницы">
                            <p className="font-accent font-bold text-foreground">
                                12–24
                            </p>
                        </MetaBlock>
                    </Card>

                    {/* Блок 3: Как цитировать */}
                    <Card variant="muted" padding="md" className="space-y-3">
                        <h4 className="flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-primary">
                            <Quote size={12} />
                            Цитирование
                        </h4>
                        <p className="text-[10px] font-serif leading-relaxed text-muted-foreground">
                            {pub.authors[0]?.full_name} ({year}). {pub.title_ru}.{' '}
                            <span className="text-foreground font-bold">ЧелГУ</span>,{' '}
                            {issueNumber}, 12–24. {pub.doi && `https://doi.org/${pub.doi}`}
                        </p>
                        <button
                            className="text-[9px] font-accent font-bold uppercase tracking-widest text-primary hover:underline"
                            onClick={() => navigator.clipboard.writeText(
                                `${pub.authors[0]?.full_name} (${year}). ${pub.title_ru}. Вестник ЧелГУ, ${issueNumber}, 12–24.`
                            )}
                        >
                            Копировать
                        </button>
                    </Card>

                    {/* Блок 4: Лицензия */}
                    <div className="p-3 bg-muted/30 border border-border">
                        <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-2">
                            Лицензия
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                            Контент распространяется по лицензии{' '}
                            <span className="font-bold text-foreground">CC BY 4.0</span>
                        </p>
                    </div>

                </aside>

            </div>
        </div>
    );
};
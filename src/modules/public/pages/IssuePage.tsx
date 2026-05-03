import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Book, User, Download, FileText } from 'lucide-react';
import { journalApi } from '../../../api/journal.ts';
import { Button } from '../../../components/ui/Button.tsx';

export const IssuePage = () => {
    const { id } = useParams<{ id: string }>();

    // 1. Загружаем данные выпуска
    const issueQuery = useQuery({
        queryKey: ['issue', id],
        queryFn: () => journalApi.getIssue(id!).then(res => res.data),
        enabled: !!id
    });

    // 2. Загружаем статьи этого выпуска
    const publicationsQuery = useQuery({
        queryKey: ['issue-publications', id],
        queryFn: () => journalApi.getIssuePublications(id!).then(res => res.data),
        enabled: !!id
    });

    const isLoading = issueQuery.isLoading || publicationsQuery.isLoading;

    if (isLoading) return <div className="p-20 text-center font-accent uppercase text-xs animate-pulse">Загрузка выпуска...</div>; // // LOC issue.loading
    if (!issueQuery.data) return <div className="p-20 text-center">Выпуск не найден</div>; // // LOC issue.not_found

    const issue = issueQuery.data;
    const publications = publicationsQuery.data || [];

    return (
        <div className="py-10 px-4 max-w-5xl mx-auto">
            {/* Хлебные крошки / Назад */}
            <Link to="/archive" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-10 font-accent font-bold uppercase text-[10px] tracking-widest transition-colors">
                <ChevronLeft size={14} />
                Назад в архив {/* // LOC nav.back_to_archive */}
            </Link>

            {/* Заголовок выпуска */}
            <header className="bg-white border border-border p-10 mb-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Book size={120} />
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="text-xs font-accent font-bold text-accent uppercase tracking-[0.3em]">
                        Scientific Publication {/* // LOC issue.header.badge */}
                    </div>
                    <h1 className="text-4xl font-heading italic">
                        Выпуск №{issue.number} {/* // LOC issue.header.number */}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-semi-transparent font-serif border-t border-border pt-4">
                        <span>{issue.publication_date ? new Date(issue.publication_date).getFullYear() : '—'} год</span>
                        <span className="w-1 h-1 bg-border rounded-full" />
                        <span>Том {issue.number}</span> {/* В реальном API тут должен быть номер тома, можно пробросить из стейта архива */}
                    </div>
                    {issue.description && (
                        <p className="text-foreground/80 max-w-2xl leading-relaxed">{issue.description}</p>
                    )}
                </div>
            </header>

            {/* Содержание */}
            <section className="space-y-8">
                <h3 className="text-xs font-accent font-bold uppercase tracking-[0.2em] text-primary border-b-2 border-primary w-fit pb-1 mb-8">
                    Содержание номера {/* // LOC issue.toc.title */}
                </h3>

                {publications.length > 0 ? (
                    <div className="divide-y divide-border border-b border-border">
                        {publications.map((pub) => (
                            <div key={pub.id} className="py-8 group">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-3 flex-grow">
                                        {/* Ссылка на статью */}
                                        <Link to={`/publications/${pub.id}`} className="block group-hover:text-primary-light transition-colors">
                                            <h4 className="text-xl font-heading leading-tight font-bold">
                                                {pub.title_ru}
                                            </h4>
                                            {pub.title_en && (
                                                <p className="text-sm text-semi-transparent italic mt-1 font-serif">{pub.title_en}</p>
                                            )}
                                        </Link>

                                        {/* Авторы и мета */}
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-accent font-bold uppercase tracking-tighter text-muted">
                      <span className="flex items-center gap-1.5 text-primary">
                        <User size={12} className="text-accent" />
                          {pub.authors.map(a => a.full_name).join(', ')}
                      </span>
                                            {pub.doi && <span className="font-mono text-accent">DOI: {pub.doi}</span>}
                                        </div>
                                    </div>

                                    {/* Кнопка PDF */}
                                    <div className="shrink-0">
                                        {pub.pdf_download_allowed ? (
                                            <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer">
                                                <Button variant="outline" className="!py-2 !px-4 !text-[10px] shadow-sm">
                                                    <Download size={14} /> PDF
                                                </Button>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 text-[9px] font-accent font-bold text-red-700 bg-red-50 px-3 py-2 border border-red-100 uppercase">
                                                <FileText size={12} />
                                                Эмбарго {/* // LOC issue.article.embargo */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-grey-50 border border-dashed border-border rounded-sm italic text-muted">
                        В данном выпуске еще нет опубликованных статей {/* // LOC issue.toc.empty */}
                    </div>
                )}
            </section>
        </div>
    );
};
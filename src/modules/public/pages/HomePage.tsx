import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Book, Download, User } from 'lucide-react';
import { journalApi } from '../../../api/journal';
import { Button } from '../../../components/ui/Button';

export const HomePage = () => {
    const { data: current, isLoading, error } = useQuery({
        queryKey: ['current-issue'],
        queryFn: () => journalApi.getCurrentIssue().then(res => res.data),
        retry: false // Чтобы не спамить запросами, если выпуска нет
    });

    if (isLoading) return <div className="p-20 text-center font-accent uppercase text-xs tracking-[0.3em]">Загрузка выпуска...</div>;

    // Если пришла ошибка 404 (выпуска нет)
    if (!current || (error as any)?.response?.status === 404) {
        return (
            <div className="py-20 text-center space-y-6">
                <h1 className="text-4xl font-heading italic tracking-tighter">Вестник ЧелГУ</h1>
                <div className="h-1 w-24 bg-accent mx-auto" />
                <p className="text-lg text-semi-transparent font-serif italic">
                    Первый выпуск готовится к публикации. {/* // LOC home.no_published_yet */}
                </p>
                <div className="pt-10 px-4">
                    <Link to="/login" className="btn-outline">Стать автором</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 space-y-16">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-5xl font-heading italic tracking-tighter">Вестник Челябинского государственного университета</h1> {/* // LOC home.hero.title */}
                <div className="h-1 w-24 bg-accent mx-auto" />
                <p className="text-lg text-semi-transparent font-serif leading-relaxed">
                    Научное периодическое издание, публикующее результаты фундаментальных и прикладных исследований. {/* // LOC home.hero.description */}
                </p>
            </section>

            {current ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t border-border pt-12">

                    {/* Левая колонка: Описание выпуска */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-primary text-white p-8 shadow-card border-b-8 border-accent">
                            <Book size={40} className="mb-6 opacity-50" />
                            <h2 className="text-2xl font-heading mb-2">Выпуск №{current.issue.number}</h2> {/* // LOC home.issue.number */}
                            <p className="text-xs font-accent uppercase tracking-widest opacity-70">
                                {current.issue.publication_date ? new Date(current.issue.publication_date).getFullYear() : ''} год
                            </p>
                            {current.issue.title && <p className="mt-4 text-sm italic border-t border-white/20 pt-4">{current.issue.title}</p>}
                        </div>

                        <div className="p-6 bg-white shadow-sm border border-border">
                            <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-4">Для читателей</h4> {/* // LOC home.sidebar.title */}
                            <ul className="text-sm space-y-3 text-semi-transparent">
                                <li><Link to="/archive" className="hover:text-accent transition-colors">Архив всех номеров</Link></li> {/* // LOC home.sidebar.archive */}
                                <li><a href="#" className="hover:text-accent transition-colors">Правила цитирования</a></li> {/* // LOC home.sidebar.rules */}
                            </ul>
                        </div>
                    </div>

                    {/* Основная колонка: Список статей */}
                    <div className="lg:col-span-3 space-y-10">
                        <h3 className="text-sm font-accent font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4">
                            Содержание выпуска {/* // LOC home.articles.title */}
                        </h3>

                        <div className="divide-y divide-border">
                            {current.publications.map((pub) => (
                                <div key={pub.id} className="py-8 first:pt-0 group">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="space-y-3 flex-grow">
                                            <Link to={`/publications/${pub.id}`} className="block group-hover:text-primary-light transition-colors">
                                                <h4 className="text-xl font-heading leading-tight">{pub.title_ru}</h4>
                                            </Link>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-bold text-primary/80 uppercase tracking-tighter">
                          <User size={12} />
                            {pub.authors.map(a => a.full_name || 'Author').join(', ')}
                        </span>
                                                {pub.doi && <span className="text-accent font-mono uppercase">DOI: {pub.doi}</span>}
                                            </div>

                                            <p className="text-sm text-semi-transparent line-clamp-3 font-serif">
                                                {pub.abstract_ru}
                                            </p>
                                        </div>

                                        <div className="shrink-0 space-y-2">
                                            {pub.pdf_download_allowed ? (
                                                <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer">
                                                    <Button variant="outline" className="w-full !py-2 !text-[10px]">
                                                        <Download size={14} /> PDF
                                                    </Button>
                                                </a>
                                            ) : (
                                                <div className="text-[10px] font-accent font-bold text-red-800 bg-red-50 p-2 uppercase border border-red-100">
                                                    Под эмбарго {/* // LOC home.articles.embargo */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 italic text-muted">Нет опубликованных выпусков</div> // // LOC home.no_issues
            )}
        </div>
    );
};
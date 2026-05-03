import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    // FileText,
    Download,
    User,
    Quote,
    ChevronLeft,
    ExternalLink,
    BookOpen
} from 'lucide-react';
import { journalApi } from '../../../api/journal';
import { Button } from '../../../components/ui/Button';

export const PublicationPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: pub, isLoading, error } = useQuery({
        queryKey: ['publication', id],
        queryFn: () => journalApi.getPublication(id!).then(res => res.data),
        enabled: !!id
    });

    if (isLoading) return <div className="p-20 text-center font-accent uppercase text-xs animate-pulse tracking-widest">Загрузка публикации...</div>; // // LOC common.loading
    if (error || !pub) return <div className="p-20 text-center">Статья не найдена</div>; // // LOC publication.not_found

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            {/* Навигация назад */}
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-10 font-accent font-bold uppercase text-[10px] tracking-widest transition-colors">
                <ChevronLeft size={14} />
                К текущему выпуску {/* // LOC nav.back_home */}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

                {/* ЛЕВАЯ ЧАСТЬ: Заголовки и Аннотации */}
                <div className="lg:col-span-3 space-y-12">
                    <header className="space-y-6">
                        <h1 className="text-4xl font-heading leading-tight text-foreground">
                            {pub.title_ru}
                        </h1>
                        {pub.title_en && (
                            <h2 className="text-2xl font-heading italic text-semi-transparent border-l-2 border-border pl-6">
                                {pub.title_en}
                            </h2>
                        )}
                    </header>

                    {/* DOI и Авторы (мобильный вид) */}
                    <div className="lg:hidden p-4 bg-grey-50 border border-border space-y-4">
                        {pub.doi && <div className="text-xs font-mono text-accent">DOI: {pub.doi}</div>}
                        <div className="text-sm font-bold text-primary uppercase tracking-tight">
                            {pub.authors.map(a => a.full_name).join(', ')}
                        </div>
                    </div>

                    {/* Аннотация RU */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-accent font-bold uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                            Аннотация {/* // LOC publication.abstract_ru */}
                        </h3>
                        <p className="font-serif leading-relaxed text-lg text-justify italic text-foreground/90">
                            {pub.abstract_ru}
                        </p>
                        <div className="pt-2">
                            <span className="text-xs font-bold text-muted uppercase mr-2">Ключевые слова:</span> {/* // LOC publication.keywords_label */}
                            <span className="text-sm text-semi-transparent">{pub.keywords_ru}</span>
                        </div>
                    </section>

                    {/* Аннотация EN */}
                    {pub.abstract_en && (
                        <section className="space-y-4 pt-8">
                            <h3 className="text-xs font-accent font-bold uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                                Abstract {/* // LOC publication.abstract_en */}
                            </h3>
                            <p className="font-serif leading-relaxed text-base text-justify text-semi-transparent">
                                {pub.abstract_en}
                            </p>
                            <div className="pt-2">
                                <span className="text-xs font-bold text-muted uppercase mr-2">Keywords:</span>
                                <span className="text-sm text-muted-foreground italic">{pub.keywords_en}</span>
                            </div>
                        </section>
                    )}
                </div>

                {/* ПРАВАЯ ЧАСТЬ: Метаданные и Скачивание */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Блок скачивания */}
                    <div className="bg-white shadow-card border-t-4 border-accent p-6 sticky top-24">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted mb-4">Доступ к материалам</h4> {/* // LOC publication.sidebar.access */}
                                {pub.pdf_download_allowed ? (
                                    <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer" className="block w-full">
                                        <Button className="w-full !py-4 shadow-lg shadow-primary/20">
                                            <Download size={18} />
                                            Скачать PDF {/* // LOC common.download_pdf */}
                                        </Button>
                                    </a>
                                ) : (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-sm">
                                        <p className="text-[10px] font-accent font-bold text-red-700 uppercase leading-tight">
                                            Доступ ограничен до окончания эмбарго {/* // LOC publication.embargo_notice */}
                                        </p>
                                        {pub.embargo_until && (
                                            <p className="text-xs text-red-900 mt-2 font-bold">
                                                {new Date(pub.embargo_until).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-border space-y-4">
                                {pub.doi && (
                                    <div>
                                        <span className="text-[9px] font-accent font-bold text-muted uppercase block mb-1">Цифровой идентификатор</span>
                                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-accent hover:underline flex items-center gap-1">
                                            {pub.doi} <ExternalLink size={10} />
                                        </a>
                                    </div>
                                )}

                                <div>
                                    <span className="text-[9px] font-accent font-bold text-muted uppercase block mb-2">Авторы</span> {/* // LOC publication.sidebar.authors */}
                                    <div className="space-y-3">
                                        {pub.authors.map((author, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <User size={14} className="text-primary mt-0.5 shrink-0" />
                                                <span className="text-sm font-medium leading-tight">{author.full_name || 'Author Name'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Ссылка на выпуск */}
                            <div className="pt-6 border-t border-border">
                                <Link to="/archive" className="flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors uppercase tracking-tighter">
                                    <BookOpen size={14} />
                                    Вернуться в архив {/* // LOC nav.back_to_archive */}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Блок цитирования */}
                    <div className="p-6 bg-grey-100 border-l-4 border-primary/20">
                        <h4 className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                            <Quote size={12} /> Как цитировать {/* // LOC publication.sidebar.citation */}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-foreground font-serif">
                            {pub.authors[0]?.full_name} и др. {pub.title_ru} // Вестник Челябинского государственного университета. {new Date().getFullYear()}.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
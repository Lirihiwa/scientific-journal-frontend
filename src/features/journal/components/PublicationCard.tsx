import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, FileText, User } from 'lucide-react';
import type { Publication } from '../journal.types';
import { journalApi } from '../journal.api';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

interface PublicationCardProps {
    pub: Publication;
    className?: string;
}

export const PublicationCard = ({ pub, className }: PublicationCardProps) => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const displayTitle = isRu ? pub.title_ru : (pub.title_en || pub.title_ru);
    const displayAbstract = isRu ? pub.abstract_ru : (pub.abstract_en || pub.abstract_ru);

    const authors = pub.authors
        .map(a => a.author_id || (isRu ? 'Автор' : 'Author'))
        .join(', ');

    return (
        <article className={cn(
            'group flex flex-col p-4 sm:p-5 bg-card border border-border/80 hover:border-primary/50 transition-all rounded-sm',
            className
        )}>
            <div className="flex items-center justify-between mb-2.5">
                <Badge variant="published">
                    {t('submission.status.published')}
                </Badge>
                {pub.doi && (
                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase">
                        {t('journal.doi')}: {pub.doi}
                    </span>
                )}
            </div>

            <div className="space-y-1.5 mb-3">
                <Link to={`/publications/${pub.id}`} className="block">
                    <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight break-words">
                        {displayTitle}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                    <User size={13} className="text-primary shrink-0" />
                    <span className="truncate text-[11px]">
                        {authors || (isRu ? "Автор не указан" : "Author not specified")}
                    </span>
                </div>
            </div>

            {displayAbstract && (
                <p className="text-xs font-serif text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {displayAbstract}
                </p>
            )}

            <div className="flex items-center justify-end pt-3 mt-auto border-t border-border/40">
                {pub.pdf_download_allowed ? (
                    <a
                        href={journalApi.getPdfUrl(pub.id)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button variant="outline" size="sm" className="gap-2 h-8 text-[9px] px-3">
                            <Download size={12} /> {t('journal.download_pdf')}
                        </Button>
                    </a>
                ) : (
                    <span className="text-[9px] font-accent font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                        <FileText size={12} /> {isRu ? 'PDF скоро' : 'PDF coming soon'}
                    </span>
                )}
            </div>
        </article>
    );
};
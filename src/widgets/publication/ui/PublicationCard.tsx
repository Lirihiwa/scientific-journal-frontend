// src/widgets/publication/ui/PublicationCard.tsx
import { Link } from 'react-router-dom';
import { Calendar, User, Download, FileText } from 'lucide-react';
import type { Publication } from '../../../entities/journal/model/types';
import { journalApi } from '../../../entities/journal/api/journal.api';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Bagde';
import { cn } from '../../../shared/lib/utils';

interface PublicationCardProps {
    pub: Publication;
    className?: string;
}

export const PublicationCard = ({ pub, className }: PublicationCardProps) => {
    const authors = pub.authors.map(a => a.full_name).join(', ');

    return (
        <article className={cn(
            'group relative flex flex-col gap-3 p-5 bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all rounded-sm',
            className
        )}>
            <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-grow">
                    {/* Статус всегда "Published" для этого типа */}
                    <Badge variant="published">Опубликовано</Badge>

                    <Link to={`/publications/${pub.id}`} className="block">
                        <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {pub.title_ru}
                        </h3>
                    </Link>

                    <p className="text-[10px] font-accent font-bold uppercase tracking-wide text-foreground/80 flex items-center gap-1.5">
                        <User size={11} className="text-primary shrink-0" />
                        <span className="truncate">{authors}</span>
                    </p>
                </div>

                {pub.published_at && (
                    <span className="text-[10px] font-accent font-bold text-muted-foreground whitespace-nowrap uppercase flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(pub.published_at).getFullYear()}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-3 mt-1 border-t border-border">
                <div className="flex items-center gap-3">
                    {pub.doi && (
                        <span className="text-[9px] font-mono text-muted-foreground">
                            <span className="font-accent font-bold text-primary uppercase">DOI: </span>
                            {pub.doi}
                        </span>
                    )}
                </div>

                {pub.pdf_download_allowed ? (
                    <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="sm" className="h-8 px-3 text-[9px] gap-1.5">
                            <Download size={12} /> PDF
                        </Button>
                    </a>
                ) : (
                    <span className="text-[9px] font-accent font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <FileText size={10} /> PDF скоро
                    </span>
                )}
            </div>
        </article>
    );
};
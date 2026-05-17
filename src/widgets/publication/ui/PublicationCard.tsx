// src/widgets/publication/ui/PublicationCard.tsx
import { Link } from 'react-router-dom';
import { Download, FileText, User } from 'lucide-react';
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

    const authors = pub.authors
        .map(a => a.author_id || `Автор #${a.author_id?.slice(0, 4) || '???'}`)
        .join(', ');

    return (
        <article className={cn(
            'group flex flex-col p-6 bg-card border border-border hover:border-primary/50 transition-all rounded-sm',
            className
        )}>
            {/* ШАПКА: Статус и доп. информация */}
            <div className="flex items-center justify-between mb-3">
                <Badge variant="published">Опубликовано</Badge>
                {pub.doi && (
                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase">
                        DOI: {pub.doi}
                    </span>
                )}
            </div>

            {/* ТЕЛО: Заголовок и Авторы */}
            <div className="space-y-2 mb-4">
                <Link to={`/publications/${pub.id}`} className="block">
                    <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight break-words">
                        {pub.title_ru}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                    <User size={14} className="text-primary shrink-0" />
                    <span className="truncate">{authors || "Автор не указан"}</span>
                </div>
            </div>

            {/* АННОТАЦИЯ: Теперь она будет заполнять пустоту */}
            {pub.abstract_ru && (
                <p className="text-sm font-serif text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {pub.abstract_ru}
                </p>
            )}

            {/* ПОДВАЛ: Кнопка PDF */}
            <div className="flex items-center justify-end pt-4 mt-auto border-t border-border">
                {pub.pdf_download_allowed ? (
                    <a href={journalApi.getPdfUrl(pub.id)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download size={14} /> Скачать PDF
                        </Button>
                    </a>
                ) : (
                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                        <FileText size={12} /> PDF скоро
                    </span>
                )}
            </div>
        </article>
    );
};
// src/widgets/publication/ui/PublicationCard.tsx
import { Link } from 'react-router-dom';
import { Calendar, User, Download, FileText } from 'lucide-react';
import type { Publication } from '../../../entities/journal/model/types';
import { journalApi } from '../../../entities/journal/api/journal.api';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Bagde';
import type { SubmissionStatus } from '../../../entities/submission/model/types';
import { cn } from '../../../shared/lib/utils';

interface PublicationCardProps {
    pub: Publication;
    showStatus?: boolean;
    status?: SubmissionStatus;
    className?: string;
    variant?: 'list' | 'grid'; // list — для ленты, grid — для сетки архива
}

export const PublicationCard = ({
                                    pub,
                                    showStatus = false,
                                    status,
                                    className,
                                    variant = 'list',
                                }: PublicationCardProps) => {
    const publishedDate = pub.published_at ? new Date(pub.published_at) : null;

    // === ВАРИАНТ: ЛЕНТА (плотная, горизонтальная) ===
    if (variant === 'list') {
        return (
            <article
                className={cn(
                    'group relative flex flex-col gap-3 p-5 bg-card border border-border hover:border-primary/40 transition-all',
                    className
                )}
            >
                {/* Верхняя строка: Badge + Дата */}
                <div className="flex flex-wrap items-center gap-3">
                    {showStatus && status && (
                        <Badge variant={status}>{status.replace('_', ' ')}</Badge>
                    )}
                    {publishedDate && (
                        <span className="text-[10px] font-accent font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-tight">
              <Calendar size={12} />
                            {publishedDate.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
            </span>
                    )}
                </div>

                {/* Заголовок */}
                <Link to={`/publications/${pub.id}`} className="block">
                    <h3 className="text-lg font-heading font-bold italic text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {pub.title_ru}
                    </h3>
                </Link>

                {/* Авторы */}
                <p className="text-[10px] font-accent font-bold uppercase tracking-wide text-foreground flex items-center gap-1.5">
                    <User size={11} className="text-primary shrink-0" />
                    <span className="truncate">
            {pub.authors.map((a) => a.full_name).join(', ')}
          </span>
                </p>

                {/* Аннотация (если есть) */}
                {pub.abstract_ru && (
                    <p className="text-[11px] font-serif italic text-muted-foreground line-clamp-2 leading-relaxed">
                        {pub.abstract_ru}
                    </p>
                )}

                {/* Нижняя строка: DOI + Кнопка PDF */}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-border">
                    <div className="flex items-center gap-3">
                        {pub.doi && (
                            <span className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                <span className="font-accent font-bold uppercase tracking-tight text-primary">
                  DOI:
                </span>
                <span className="truncate max-w-[200px]">{pub.doi}</span>
              </span>
                        )}
                    </div>

                    <div className="shrink-0">
                        {pub.pdf_download_allowed ? (
                            <a
                                href={journalApi.getPdfUrl(pub.id)}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 text-[9px] gap-1.5"
                                >
                                    <Download size={12} />
                                    PDF
                                </Button>
                            </a>
                        ) : (
                            <span className="px-2.5 py-1 bg-muted/50 border border-border text-[9px] font-accent font-bold uppercase tracking-tight text-muted-foreground">
                <FileText size={10} className="inline mr-1" />
                Скоро
              </span>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // === ВАРИАНТ: СЕТКА (для архива, компактный) ===
    return (
        <article
            className={cn(
                'group relative flex flex-col gap-2 p-4 bg-card border border-border hover:border-primary/40 transition-all',
                className
            )}
        >
            {/* Верхняя строка: Badge + Дата */}
            <div className="flex flex-wrap items-center gap-2">
                {showStatus && status && (
                    <Badge variant={status}>{status.replace('_', ' ')}</Badge>
                )}
                {publishedDate && (
                    <span className="text-[9px] font-accent font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-tight">
            <Calendar size={10} />
                        {publishedDate.toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
          </span>
                )}
            </div>

            {/* Заголовок */}
            <Link to={`/publications/${pub.id}`} className="block">
                <h3 className="text-base font-heading font-bold italic text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {pub.title_ru}
                </h3>
            </Link>

            {/* Авторы */}
            <p className="text-[9px] font-accent font-bold uppercase tracking-wide text-muted-foreground truncate">
                {pub.authors.map((a) => a.full_name).join(', ')}
            </p>

            {/* Нижняя строка: DOI + PDF */}
            <div className="flex items-center justify-between pt-2 mt-auto border-t border-border">
                {pub.doi && (
                    <span className="text-[8px] font-mono text-muted-foreground truncate">
            {pub.doi}
          </span>
                )}
                <div className="shrink-0 ml-2">
                    {pub.pdf_download_allowed ? (
                        <a
                            href={journalApi.getPdfUrl(pub.id)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-[8px] gap-1"
                            >
                                <Download size={10} />
                                PDF
                            </Button>
                        </a>
                    ) : (
                        <span className="px-2 py-0.5 bg-muted/50 border border-border text-[8px] font-accent font-bold uppercase text-muted-foreground">
              <FileText size={9} className="inline mr-0.5" />
              —
            </span>
                    )}
                </div>
            </div>
        </article>
    );
};
import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Clock, User, FileText, Globe, GitCommit } from 'lucide-react';
import type { Submission } from '../submission.types';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

interface SubmissionCardProps {
    submission: Submission;
    actions?: React.ReactNode;
    showLink?: boolean;
    className?: string;
}

export const SubmissionCard = ({ submission, actions, showLink = true, className }: SubmissionCardProps) => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const authors = submission.coauthors.map(a => a.full_name).join(', ');
    const detailsUrl = `/submissions/${submission.id}`;

    const displayTitle = isRu ? submission.title_ru : (submission.title_en || submission.title_ru);
    const displayAbstract = isRu ? submission.abstract_ru : (submission.abstract_en || submission.abstract_ru);

    return (
        <article className={cn(
            'group flex flex-col p-4 sm:p-5 bg-card border border-border/80 hover:border-primary/30 transition-all duration-200 rounded-sm relative',
            showLink && 'hover:shadow-sm',
            className
        )}>
            <header className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-4 border-b border-border/40">
                <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant={submission.status}>
                        {t(`submission.status.${submission.status}`)}
                    </Badge>

                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase tracking-tight">
                        ID: {submission.id.slice(0, 8)}
                    </span>

                    <span className="flex items-center gap-1 text-[9px] font-accent font-bold uppercase text-primary bg-primary/5 px-1.5 py-0.5 rounded-sm">
                        <GitCommit size={10} /> v.{submission.current_version}
                    </span>
                </div>

                <div className="flex items-center gap-3.5 text-[10px] font-accent font-bold text-muted-foreground uppercase tracking-tight">
                    <span className="flex items-center gap-1">
                        <Globe size={11} className="text-primary/70" />
                        {submission.manuscript_language === 'ru' ? 'RU' : 'EN'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={11} className="text-primary/70" />
                        {new Date(submission.created_at).toLocaleDateString(isRu ? 'ru-RU' : 'en-US')}
                    </span>
                </div>
            </header>

            <div className="space-y-2.5 flex-grow min-w-0">
                {showLink ? (
                    <Link to={detailsUrl} className="block group/title">
                        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground group-hover/title:text-primary transition-colors leading-tight break-words line-clamp-2">
                            {displayTitle}
                        </h3>
                    </Link>
                ) : (
                    <h3 className="text-lg md:text-xl font-heading font-bold text-foreground leading-tight break-words line-clamp-2">
                        {displayTitle}
                    </h3>
                )}

                <p className="text-[10px] font-accent font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5 mt-1">
                    <User size={12} className="text-primary shrink-0" />
                    <span className="truncate">{authors || (isRu ? "Автор (вы)" : "Author (you)")}</span>
                </p>

                {displayAbstract && (
                    <p className="text-xs md:text-sm font-serif text-muted-foreground line-clamp-2 leading-relaxed break-words pt-1">
                        {displayAbstract}
                    </p>
                )}
            </div>

            <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 mt-4 border-t border-border/40">
                <div className="flex items-center gap-2.5 min-w-0 sm:max-w-[50%]">
                    <div className="w-7 h-7 bg-muted rounded-sm flex items-center justify-center shrink-0 border border-border/40">
                        <FileText size={13} className="text-muted-foreground" />
                    </div>
                    <div className="truncate">
                        <p className="text-[8px] font-accent font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                            {t('submission.form.file')}
                        </p>
                        <p className="text-xs font-serif text-foreground truncate" title={submission.submitted_file_name || ""}>
                            {submission.submitted_file_name || (isRu ? "Файл отсутствует" : "No file uploaded")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end sm:self-auto">
                    {actions}

                    {showLink && (
                        <Link to={detailsUrl}>
                            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-[9px] px-3">
                                {t('common.more')} <ArrowRight size={12} />
                            </Button>
                        </Link>
                    )}
                </div>
            </footer>
        </article>
    );
};
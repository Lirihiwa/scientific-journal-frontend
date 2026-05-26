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
            'group flex flex-col p-6 bg-card border border-border hover:border-primary/50 transition-all rounded-sm relative',
            showLink && 'hover:shadow-md',
            className
        )}>
            <header className="flex flex-wrap items-center justify-between gap-4 pb-3 mb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <Badge variant={submission.status}>
                        {t(`submission.status.${submission.status}`)}
                    </Badge>

                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase">
                        ID: {submission.id.slice(0, 8)}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-accent font-bold uppercase text-primary bg-primary/5 px-1.5 py-0.5 rounded-sm">
                        <GitCommit size={10} /> v.{submission.current_version}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-accent font-bold text-muted-foreground uppercase">
                    <span className="flex items-center gap-1.5">
                        <Globe size={12} className="text-primary/70" />
                        {submission.manuscript_language === 'ru' ? 'RU' : 'EN'}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-primary/70" />
                        {new Date(submission.created_at).toLocaleDateString(isRu ? 'ru-RU' : 'en-US')}
                    </span>
                </div>
            </header>

            <div className="space-y-3 flex-grow min-w-0">
                {showLink ? (
                    <Link to={detailsUrl} className="block">
                        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight break-words line-clamp-3">
                            {displayTitle}
                        </h3>
                    </Link>
                ) : (
                    <h3 className="text-xl font-heading font-bold text-foreground leading-tight break-words line-clamp-3">
                        {displayTitle}
                    </h3>
                )}

                <p className="text-[10px] font-accent font-bold uppercase tracking-wide text-foreground/80 flex items-center gap-1.5">
                    <User size={12} className="text-primary shrink-0" />
                    <span className="truncate">{authors || (isRu ? "Автор (вы)" : "Author (you)")}</span>
                </p>

                {displayAbstract && (
                    <p className="text-sm font-serif text-muted-foreground line-clamp-2 leading-relaxed break-words">
                        {displayAbstract}
                    </p>
                )}
            </div>

            <footer className="flex items-center justify-between gap-4 pt-4 mt-4 border-t border-border">
                <div className="flex items-center gap-2 min-w-0 max-w-[50%]">
                    <div className="w-8 h-8 bg-muted rounded-sm flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-muted-foreground" />
                    </div>
                    <div className="truncate">
                        <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                            {t('submission.form.file')}
                        </p>
                        <p className="text-xs font-serif text-foreground truncate" title={submission.submitted_file_name || ""}>
                            {submission.submitted_file_name || (isRu ? "Файл отсутствует" : "No file uploaded")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {actions}

                    {showLink && (
                        <Link to={detailsUrl}>
                            <Button variant="outline" size="sm" className="gap-2">
                                {t('common.more')} <ArrowRight size={14} />
                            </Button>
                        </Link>
                    )}
                </div>
            </footer>
        </article>
    );
};
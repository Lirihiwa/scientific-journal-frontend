// src/widgets/submission/ui/SubmissionCard.tsx
import React from "react";
import {Link} from 'react-router-dom';
import {ArrowRight, Clock, User} from 'lucide-react';
import type {Submission} from '../../../entities/submission/model/types';
import {Badge} from '../../../shared/ui/Bagde';
import {Button} from '../../../shared/ui/Button';
import {cn} from '../../../shared/lib/utils';

interface SubmissionCardProps {
    submission: Submission;
    actions?: React.ReactNode; // Пропс для кнопок редактора
    showLink?: boolean;        // Ссылка на детали (нужна автору, не всегда нужна редактору)
    className?: string;
}

export const SubmissionCard = ({submission, actions, showLink = true, className}: SubmissionCardProps) => {
    const authors = submission.coauthors.map(a => a.full_name).join(', ');
    const detailsUrl = `/submissions/${submission.id}`;

    return (
        <article className={cn(
            'group relative flex flex-col gap-4 p-6 bg-card border border-border hover:border-primary/40 transition-all rounded-sm',
            showLink && 'hover:shadow-md',
            className
        )}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Badge variant={submission.status}>{submission.status.replace('_', ' ')}</Badge>
                    <span className="text-[10px] font-accent font-bold text-muted-foreground uppercase">
                        ID: {submission.id.slice(0, 8)}
                    </span>
                </div>

                <span
                    className="text-[10px] font-accent font-bold text-muted-foreground flex items-center gap-1.5 uppercase">
                    <Clock size={12} className="text-primary"/>
                    {new Date(submission.created_at).toLocaleDateString('ru-RU')}
                </span>
            </div>

            <div className="space-y-2 flex-grow">
                {showLink ? (
                    <Link to={detailsUrl}>
                        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {submission.title_ru}
                        </h3>
                    </Link>
                ) : (
                    <h3 className="text-xl font-heading font-bold text-foreground leading-tight">
                        {submission.title_ru}
                    </h3>
                )}

                <p className="text-[10px] font-accent font-bold uppercase tracking-wide text-foreground/80 flex items-center gap-1.5">
                    <User size={11} className="text-primary shrink-0"/>
                    <span className="truncate">{authors || "Автор (вы)"}</span>
                </p>

                {/* Аннотация в сокращенном виде для редактора */}
                {!showLink && submission.abstract_ru && (
                    <p className="text-[11px] font-serif text-muted-foreground line-clamp-2 pt-1 border-t border-border/50 mt-2">
                        {submission.abstract_ru}
                    </p>
                )}
            </div>

            {(actions || showLink) && (
                <div className="flex items-center justify-end gap-3 pt-4 mt-auto border-t border-border/60">
                    {actions}
                    {showLink && (
                        <Link to={detailsUrl}>
                            <Button variant="outline" size="icon"
                                    className="rounded-full hover:scale-105 transition-transform">
                                <ArrowRight size={18}/>
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </article>
    );
};
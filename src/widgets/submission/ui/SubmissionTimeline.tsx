// src/widgets/submission/ui/SubmissionTimeline.tsx
import { Clock, MessageSquare, User as UserIcon } from 'lucide-react';
import { Badge } from '../../../shared/ui/Bagde';
import { SectionHeader } from '../../../shared/ui/SectionHeader';
import { Card } from '../../../shared/ui/Card';
import type { SubmissionEvent } from '../../../entities/submission/model/types';

interface SubmissionTimelineProps {
    events: SubmissionEvent[];
}

export const SubmissionTimeline = ({ events }: SubmissionTimelineProps) => {
    if (!events || events.length === 0) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <SectionHeader title="История обработки" />

            <div className="relative space-y-0">
                {/* Вертикальная линия таймлайна */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border opacity-50" />

                {events.map((event) => (
                    <div key={event.id} className="relative pl-12 pb-10 last:pb-0 group">

                        {/* Точка на линии */}
                        <div className="absolute left-0 top-1 w-[40px] h-[40px] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-background border-2 border-primary z-10 ring-4 ring-background" />
                        </div>

                        <Card variant="flat" padding="none" className="space-y-3">
                            {/* Шапка события */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                    <Clock size={12} className="text-primary" />
                                    {new Date(event.created_at).toLocaleString('ru-RU', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>

                                <div className="flex items-center gap-2">
                                    {event.to_status && (
                                        <Badge variant={event.to_status}>
                                            {event.to_status.replace('_', ' ')}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Тело события */}
                            <div className="space-y-2">
                                <p className="text-[11px] font-accent font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                                    <UserIcon size={12} className="text-muted-foreground" />
                                    {event.actor_role === 'author' ? 'Автор' : 'Редакция'}
                                    <span className="text-muted-foreground font-normal lowercase">инициировал действие</span>
                                </p>

                                {/* Комментарий (шрифт Merriweather) */}
                                {event.comment && (
                                    <div className="mt-3 p-4 bg-muted/30 border-l-2 border-accent/50 rounded-sm">
                                        <div className="flex gap-3">
                                            <MessageSquare size={14} className="text-accent shrink-0 mt-1" />
                                            <p className="text-sm font-serif italic leading-relaxed text-foreground/90 whitespace-pre-wrap">
                                                {event.comment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
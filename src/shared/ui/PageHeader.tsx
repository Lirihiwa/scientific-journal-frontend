// src/shared/ui/PageHeader.tsx
import { cn } from '../lib/utils';
import React from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
    withBorder?: boolean; // Явный переключатель полосы
}

export const PageHeader = ({
                               title,
                               subtitle,
                               action,
                               className,
                               withBorder = true
                           }: PageHeaderProps) => {
    return (
        <header className={cn(
            'flex flex-col md:flex-row md:items-end justify-between gap-6',
            withBorder ? 'border-b border-border pb-6' : 'pb-2',
            className
        )}>
            <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">{title}</h1>
                {subtitle && (
                    <p className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </header>
    );
};
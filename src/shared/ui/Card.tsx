import {cn} from '../lib/utils';
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'accent' | 'muted' | 'interactive' | 'flat';
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

const variants = {
    default: 'bg-card border border-border shadow-sm',
    accent: 'bg-card border border-border border-t-4 border-t-primary shadow-sm',
    muted: 'bg-muted/40 border border-border',
    interactive: 'bg-card border border-border shadow-sm hover:border-primary/50 transition-colors cursor-pointer',
    flat: 'bg-transparent border-none shadow-none',
};

const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
};

export const Card = ({className, variant = 'default', padding = 'md', children, ...props}: CardProps) => {
    return (
        <div className={cn('rounded-sm animate-fade-in', variants[variant], paddings[padding], className)} {...props}>
            {children}
        </div>
    );
};
import {cn} from '../lib/utils';
import {AlertCircle} from 'lucide-react';
import React from "react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export const EmptyState = ({
                               title,
                               description,
                               icon = <AlertCircle size={48}/>,
                               action,
                               className
                           }: EmptyStateProps) => {
    return (
        <div
            className={cn('py-20 text-center border-2 border-dashed border-border rounded-sm bg-card/50 animate-fade-in', className)}>
            <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">{title}</h3>
            {description &&
                <p className="text-sm font-serif text-muted-foreground mb-8 max-w-md mx-auto">{description}</p>}
            {action}
        </div>
    );
};
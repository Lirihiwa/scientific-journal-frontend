import { cn } from '../../utils/cn';
import { AlertCircle } from 'lucide-react';
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
                               icon = <AlertCircle size={40} />,
                               action,
                               className
                           }: EmptyStateProps) => {
    return (
        <div
            className={cn(
                'py-12 sm:py-16 px-4 text-center border border-dashed border-border/60 rounded-sm bg-card/50 animate-fade-in',
                className
            )}
        >
            <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted text-muted-foreground mb-5"
            >
                {icon}
            </div>

            <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-1.5">
                {title}
            </h3>

            {description && (
                <p className="text-xs sm:text-sm font-serif text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
};
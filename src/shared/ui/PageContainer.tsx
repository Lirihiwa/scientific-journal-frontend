import { cn } from '../lib/utils';
import React from "react";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacings = {
    none: '',
    sm: 'space-y-6',
    md: 'space-y-10',
    lg: 'space-y-16',
};

export const PageContainer = ({ children, className, spacing = 'md' }: PageContainerProps) => {
    return (
        <div className={cn(
            "max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-8 animate-fade-in",
            spacings[spacing],
            className
        )}>
            {children}
        </div>
    );
};
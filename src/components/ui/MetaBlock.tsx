import React from 'react';
import {cn} from '../../utils/cn';

interface MetaBlockProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const MetaBlock = ({
                              title,
                              icon,
                              children,
                              className
                          }: MetaBlockProps) => {
    return (
        <div className={cn("space-y-3 pb-4 border-b border-border last:border-0 last:pb-0", className)}>
            {title && (
                <h4 className="flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground">
                    {icon}
                    {title}
                </h4>
            )}
            <div className="text-[11px] text-foreground">
                {children}
            </div>
        </div>
    );
};
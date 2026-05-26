import { cn } from '../../utils/cn';
import React from "react";

export type StatusVariant =
    | 'default'
    | 'new'
    | 'under_review'
    | 'revision_required'
    | 'accepted'
    | 'rejected'
    | 'published';

interface BadgeProps {
    children: React.ReactNode;
    variant?: StatusVariant;
    className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
    default: 'bg-secondary text-secondary-foreground border-border',
    new: 'bg-status-new/10 text-status-new border-status-new/20',
    under_review: 'bg-status-review/10 text-status-review border-status-review/20',
    revision_required: 'bg-status-revision/10 text-status-revision border-status-revision/20',
    accepted: 'bg-status-accepted/10 text-status-accepted border-status-accepted/20',
    rejected: 'bg-status-rejected/10 text-status-rejected border-status-rejected/20',
    published: 'bg-status-published/10 text-status-published border-status-published/20',
};

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-tighter border rounded-sm transition-colors",
            variantStyles[variant] || variantStyles.default,
            className
        )}>
            {children}
        </span>
    );
};
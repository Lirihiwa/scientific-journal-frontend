// src/shared/ui/TextArea.tsx
import React, {forwardRef} from 'react';
import {cn} from '../lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({className, label, error, ...props}, ref) => (
        <div className="w-full space-y-1.5">
            {label &&
                <label className="block text-[10px] font-accent font-bold uppercase tracking-widest">{label}</label>}
            <textarea
                ref={ref}
                className={cn(
                    "flex min-h-[120px] w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
                    error && "border-destructive",
                    className
                )}
                {...props}
            />
            {error && <p className="text-[10px] font-bold uppercase text-destructive">{error}</p>}
        </div>
    )
);
TextArea.displayName = "TextArea";
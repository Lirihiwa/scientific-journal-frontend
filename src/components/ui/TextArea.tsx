// src/components/ui/TextArea.tsx
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-accent font-bold uppercase tracking-widest mb-1.5 text-primary">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`input-field min-h-[120px] resize-y ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{error}</p>}
            </div>
        );
    }
);
import React, {forwardRef} from 'react';
import {cn} from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, type, label, error, icon, ...props}, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        className="block text-[10px] font-accent font-bold uppercase tracking-widest text-foreground">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            icon && "pl-10",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-[10px] font-bold uppercase tracking-tight text-destructive animate-fade-in-up">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";
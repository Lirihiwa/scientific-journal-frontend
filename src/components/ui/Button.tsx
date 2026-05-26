import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', isLoading, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-sm font-bold uppercase tracking-widest text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
            outline: "border border-input bg-transparent hover:bg-secondary hover:text-secondary-foreground",
            ghost: "bg-transparent hover:bg-secondary hover:text-secondary-foreground",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        };

        const sizes = {
            sm: "h-8 px-4",
            md: "h-10 px-6 py-2.5",
            lg: "h-12 px-8 text-xs",
            icon: "h-10 w-10",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
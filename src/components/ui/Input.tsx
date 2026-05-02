import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-accent font-bold uppercase tracking-widest mb-1.5 text-primary">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`input-field ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{error}</p>}
            </div>
        );
    }
);
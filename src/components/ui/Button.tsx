import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  isLoading,
                                                  className = '',
                                                  ...props
                                              }) => {
    const baseStyles = "btn-primary"; // Определено в index.css
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        ghost: "bg-transparent text-primary hover:bg-secondary",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? "..." : children} {/* // LOC common.loading */}
        </button>
    );
};
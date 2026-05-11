import {cn} from '../lib/utils';
import React from "react";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const PageContainer = ({children, className}: PageContainerProps) => {
    return (
        <div className={cn("max-w-5xl mx-auto py-10 px-4 animate-fade-in", className)}>
            {children}
        </div>
    );
};
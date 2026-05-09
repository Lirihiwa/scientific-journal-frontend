// src/shared/ui/Modal.tsx
import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import {cn} from '../lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({isOpen, onClose, title, children, className}: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Небольшой хак для предотвращения прыжка страницы при скрытии скролла
            document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* Overlay click area */}
                <div className="absolute inset-0" onClick={onClose}/>

                {/* Modal content */}
                <div
                    className={cn(
                        "relative w-full max-w-lg bg-card border border-border shadow-lg p-6 rounded-sm animate-fade-in-up",
                        className
                    )}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <h2 className="text-xl font-heading text-foreground tracking-tight">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5"/>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
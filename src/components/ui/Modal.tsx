import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    // Блокируем скролл основной страницы при открытии
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    // Используем стандартные классы Tailwind v4 для фиксации и z-index
    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative bg-white shadow-2xl border-t-4 border-primary w-full max-w-lg p-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={e => e.stopPropagation()} // Останавливаем всплытие клика
            >
                {/* Шапка модалки */}
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                    <h2 className="text-xl font-heading italic uppercase text-primary tracking-tight">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted hover:text-primary transition-colors cursor-pointer p-1"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Контент */}
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
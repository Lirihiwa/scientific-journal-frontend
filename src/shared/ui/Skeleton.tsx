import {cn} from '../lib/utils';

interface SkeletonProps {
    variant?: 'block' | 'text' | 'circle' | 'button';
    className?: string;
}

const variants = {
    block: 'rounded-sm',
    text: 'h-4 w-3/4 rounded-sm',
    circle: 'rounded-full',
    button: 'h-10 w-32 rounded-sm',
};

export const Skeleton = ({variant = 'block', className}: SkeletonProps) => {
    return (
        <div className={cn('bg-muted animate-skeleton', variants[variant], className)}/>
    );
};

// Компонент для загрузки списков
export const SkeletonList = ({count = 3, className}: { count?: number; className?: string }) => (
    <div className={cn('space-y-4', className)}>
        {Array.from({length: count}).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full"/>
        ))}
    </div>
);
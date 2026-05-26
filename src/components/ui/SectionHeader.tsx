import { cn } from '../../utils/cn';

interface SectionHeaderProps {
    title: string;
    prefix?: string;
    className?: string;
}

export const SectionHeader = ({ title, prefix, className }: SectionHeaderProps) => {
    return (
        <div className={cn('flex items-center gap-3 border-b border-border pb-3', className)}>
            {prefix &&
                <span className="text-xs font-accent font-bold uppercase tracking-widest text-primary">{prefix}</span>}
            <h2 className="text-lg md:text-xl font-heading font-bold text-foreground">{title}</h2>
            <div className="h-px flex-grow bg-border ml-4 opacity-30" />
        </div>
    );
};
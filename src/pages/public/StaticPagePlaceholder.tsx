// src/pages/public/StaticPagePlaceholder.tsx
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { FileText } from 'lucide-react';

export const StaticPagePlaceholder = ({ title }: { title: string }) => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in space-y-8">
            <PageHeader title={title} subtitle="Journal Information" className="border-b-0 pb-0 mb-6" />

            <Card padding="lg" variant="flat" className="border border-dashed border-border bg-muted/20 text-center">
                <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="font-serif text-lg text-muted-foreground mb-2">
                    Раздел в стадии наполнения контентом.
                </p>
                <p className="text-[10px] font-accent uppercase tracking-widest text-muted-foreground">
                    Текст будет предоставлен редакцией позднее.
                </p>
            </Card>
        </div>
    );
};
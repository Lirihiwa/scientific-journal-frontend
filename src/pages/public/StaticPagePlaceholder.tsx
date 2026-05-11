// src/pages/public/StaticPagePlaceholder.tsx
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { FileText } from 'lucide-react';
import {PageContainer} from "../../shared/ui/PageContainer.tsx";

export const StaticPagePlaceholder = ({ title }: { title: string }) => {
    return (
        <PageContainer className="space-y-8">
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
        </PageContainer>
    );
};
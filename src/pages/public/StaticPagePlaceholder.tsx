// src/pages/public/StaticPagePlaceholder.tsx
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../components/ui/PageHeader.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { FileText } from 'lucide-react';
import { PageContainer } from "../../components/ui/PageContainer.tsx";

export const StaticPagePlaceholder = ({ title }: { title: string }) => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer className="space-y-8">
            <PageHeader
                title={title}
                subtitle={isRu ? "Информация о журнале" : "Journal Information"}
            />

            <Card padding="lg" variant="flat" className="border border-dashed border-border bg-muted/20 text-center">
                <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="font-serif text-lg text-muted-foreground mb-2">
                    {isRu
                        ? "Раздел в стадии наполнения контентом."
                        : "This section is currently under development."}
                </p>
                <p className="text-[10px] font-accent uppercase tracking-widest text-muted-foreground">
                    {isRu
                        ? "Текст будет предоставлен редакцией позднее."
                        : "The content will be provided by the editorial board shortly."}
                </p>
            </Card>
        </PageContainer>
    );
};
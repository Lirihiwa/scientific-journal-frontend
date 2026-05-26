// src/pages/author/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { FileX, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { submissionApi } from '../../entities/submission/api/submission.api';
import { Button } from '../../components/ui/Button.tsx';
import { PageHeader } from '../../components/ui/PageHeader.tsx';
import { SkeletonList } from '../../components/ui/Skeleton.tsx';
import { EmptyState } from '../../components/ui/EmptyState.tsx';
import { SubmissionCard } from "../../widgets/submission/ui/SubmissionCard.tsx";
import { PageContainer } from "../../components/ui/PageContainer.tsx";

export const DashboardPage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const { data: submissions, isLoading } = useQuery({
        queryKey: ['my-submissions'],
        queryFn: submissionApi.getMySubmissions
    });

    return (
        <PageContainer className="space-y-10">
            <PageHeader
                title={t('nav.my_submissions')}
                subtitle="Manuscript Management System"
                action={
                    <Link to="/submissions/new">
                        <Button>
                            <Plus size={16} className="mr-2" />
                            {t('nav.submit')}
                        </Button>
                    </Link>
                }
            />

            <div className="space-y-4">
                {isLoading ? (
                    <SkeletonList count={3} className="h-32" />
                ) : submissions?.length ? (
                    submissions.map((sub) => (
                        <SubmissionCard key={sub.id} submission={sub} />
                    ))
                ) : (
                    <EmptyState
                        title={isRu ? "Список ваших рукописей пока пуст" : "Your manuscript list is empty"}
                        description={isRu
                            ? "Подайте первую статью, чтобы начать публикационный процесс."
                            : "Submit your first article to start the publication process."
                        }
                        icon={<FileX size={48} />}
                        action={
                            <Link to="/submissions/new">
                                <Button>{t('nav.submit')}</Button>
                            </Link>
                        }
                    />
                )}
            </div>
        </PageContainer>
    );
};
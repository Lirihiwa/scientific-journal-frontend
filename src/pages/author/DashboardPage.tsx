// src/pages/author/DashboardPage.tsx
import {useQuery} from '@tanstack/react-query';
import {FileX, Plus} from 'lucide-react';
import {Link} from 'react-router-dom';
import {submissionApi} from '../../entities/submission/api/submission.api';
import {Button} from '../../shared/ui/Button';
import {PageHeader} from '../../shared/ui/PageHeader';
import {SkeletonList} from '../../shared/ui/Skeleton';
import {EmptyState} from '../../shared/ui/EmptyState';
import {SubmissionCard} from "../../widgets/submission/ui/SubmissionCard.tsx";
import {PageContainer} from "../../shared/ui/PageContainer.tsx";

export const DashboardPage = () => {
    const {data: submissions, isLoading} = useQuery({
        queryKey: ['my-submissions'],
        queryFn: submissionApi.getMySubmissions
    });

    return (
        <PageContainer className="space-y-10">
            <PageHeader
                title="Кабинет автора"
                subtitle="Manuscript Management System"
                action={<Link to="/submissions/new"><Button><Plus size={16} className="mr-2"/> Подать
                    статью</Button></Link>}
            />
            <div className="space-y-4">
                {isLoading ? (
                    <SkeletonList count={3} className="h-32"/>
                ) : submissions?.length ? (
                    submissions.map((sub) => (
                        <SubmissionCard key={sub.id} submission={sub} />
                    ))
                ) : (
                    <EmptyState
                        title="Список ваших рукописей пока пуст"
                        description="Подайте первую статью, чтобы начать публикационный процесс."
                        icon={<FileX size={48}/>}
                        action={<Link to="/submissions/new"><Button>Подать статью</Button></Link>}
                    />
                )}
            </div>
        </PageContainer>
    );
};
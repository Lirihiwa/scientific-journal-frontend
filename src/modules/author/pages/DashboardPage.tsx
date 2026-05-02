// src/modules/author/pages/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, FileText, Clock, ExternalLink } from 'lucide-react';
import { submissionsApi } from '../../../api/submissions';
import { Button } from '../../../components/ui/Button';
import type { SubmissionStatus } from '../../../types/submissions';

// Функция маппинга статусов в понятный текст и цвета
const getStatusBadge = (status: SubmissionStatus) => {
    const map: Record<SubmissionStatus, { label: string; style: string }> = {
        new: { label: 'Новая', style: 'bg-blue-100 text-blue-800' }, // // LOC status.new
        under_review: { label: 'На рецензировании', style: 'bg-amber-100 text-amber-800' }, // // LOC status.under_review
        revision_required: { label: 'Требуется доработка', style: 'bg-purple-100 text-purple-800' }, // // LOC status.revision_required
        accepted: { label: 'Принята', style: 'bg-green-100 text-green-800' }, // // LOC status.accepted
        rejected: { label: 'Отклонена', style: 'bg-red-100 text-red-800' }, // // LOC status.rejected
        published: { label: 'Опубликована', style: 'bg-teal-100 text-teal-800' }, // // LOC status.published
    };
    return map[status] || { label: status, style: 'bg-gray-100 text-gray-800' };
};

export const DashboardPage = () => {
    // Загружаем данные через TanStack Query
    const { data: submissions, isLoading, error } = useQuery({
        queryKey: ['my-submissions'],
        queryFn: async () => {
            const res = await submissionsApi.getMySubmissions();
            return res.data;
        }
    });

    return (
        <div className="py-10 px-4">
            {/* Шапка кабинета */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-heading uppercase tracking-tight">Мои рукописи</h1> {/* // LOC author.dashboard.title */}
                    <p className="text-semi-transparent text-sm mt-1">Управление поданными статьями и отслеживание статусов</p> {/* // LOC author.dashboard.subtitle */}
                </div>

                <Link to="/submissions/new">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Plus size={16} />
                        Подать статью {/* // LOC author.dashboard.submit_btn */}
                    </Button>
                </Link>
            </div>

            {/* Состояние загрузки */}
            {isLoading && (
                <div className="text-center py-20 text-muted-foreground font-accent uppercase text-xs tracking-widest">
                    Загрузка списка статей... {/* // LOC author.dashboard.loading */}
                </div>
            )}

            {/* Ошибка */}
            {error && (
                <div className="bg-red-50 text-red-700 p-4 border-l-4 border-red-700 text-sm">
                    Не удалось загрузить список статей. Пожалуйста, авторизуйтесь. {/* // LOC author.dashboard.error */}
                </div>
            )}

            {/* Список статей */}
            {submissions && submissions.length > 0 ? (
                <div className="space-y-6">
                    {submissions.map((sub) => {
                        const statusInfo = getStatusBadge(sub.status);
                        return (
                            <div key={sub.id} className="bg-white shadow-card p-6 border-l-4 border-primary hover:border-accent transition-all">
                                <div className="flex flex-col md:flex-row justify-between gap-4">

                                    {/* Контент слева */}
                                    <div className="space-y-2 flex-grow">
                                        <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-accent font-bold uppercase px-2 py-0.5 rounded-sm ${statusInfo.style}`}>
                        {statusInfo.label}
                      </span>
                                            <span className="text-xs text-muted flex items-center gap-1">
                        <Clock size={12} />
                                                {new Date(sub.created_at).toLocaleDateString()}
                      </span>
                                        </div>

                                        <h3 className="text-xl font-heading text-foreground font-bold hover:text-primary-light">
                                            <Link to={`/submissions/${sub.id}`}>
                                                {sub.title_ru}
                                            </Link>
                                        </h3>

                                        {sub.title_en && (
                                            <p className="text-sm text-semi-transparent italic font-serif">{sub.title_en}</p>
                                        )}
                                    </div>

                                    {/* Действия справа */}
                                    <div className="flex items-center gap-2 md:self-center">
                                        <Link to={`/submissions/${sub.id}`} className="text-primary hover:text-primary-light p-2" title="Открыть детали">
                                            <ExternalLink size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Пустое состояние */
                !isLoading && !error && (
                    <div className="text-center py-20 bg-white shadow-card">
                        <FileText size={48} className="mx-auto text-muted mb-4" />
                        <h3 className="text-lg font-heading mb-2">У вас пока нет поданных статей</h3> {/* // LOC author.dashboard.empty.title */}
                        <p className="text-semi-transparent text-sm mb-6">Вы можете отправить свою первую работу прямо сейчас</p> {/* // LOC author.dashboard.empty.subtitle */}
                        <Link to="/submissions/new">
                            <Button>
                                <Plus size={16} />
                                Начать подачу {/* // LOC author.dashboard.empty.submit_now */}
                            </Button>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};
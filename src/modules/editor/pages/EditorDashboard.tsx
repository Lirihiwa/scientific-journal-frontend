import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardList, BookPlus, Layers, CheckCircle } from 'lucide-react';
import { submissionsApi } from '../../../api/submissions';
import { journalApi } from '../../../api/journal';
import { Button } from '../../../components/ui/Button';
import type { SubmissionStatus } from '../../../types/submissions';

export const EditorDashboard = () => {
    const [activeTab, setActiveTab] = useState<'manuscripts' | 'journal'>('manuscripts');
    const queryClient = useQueryClient();

    // Загружаем все статьи
    const { data: allSubmissions } = useQuery({
        queryKey: ['editor-submissions'],
        queryFn: () => submissionsApi.getAllSubmissions().then(res => res.data)
    });

    // Мутация для смены статуса
    const statusMutation = useMutation({
        mutationFn: ({ id, status, comment }: { id: string; status: SubmissionStatus; comment?: string }) =>
            submissionsApi.patchStatus(id, status, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-submissions'] });
            alert("Статус обновлен"); // // LOC editor.alerts.status_updated
        }
    });

    return (
        <div className="py-10 px-4">
            <h1 className="text-3xl font-heading uppercase italic mb-8 border-b border-border pb-4">
                Панель редактора {/* // LOC editor.title */}
            </h1>

            {/* Вкладки */}
            <div className="flex gap-8 mb-10 border-b border-border">
                <button
                    onClick={() => setActiveTab('manuscripts')}
                    className={`pb-4 text-xs font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'manuscripts' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-primary'}`}
                >
                    <ClipboardList className="inline mr-2" size={16} />
                    Рукописи {/* // LOC editor.tabs.manuscripts */}
                </button>
                <button
                    onClick={() => setActiveTab('journal')}
                    className={`pb-4 text-xs font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'journal' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-primary'}`}
                >
                    <Layers className="inline mr-2" size={16} />
                    Управление выпусками {/* // LOC editor.tabs.journal */}
                </button>
            </div>

            {activeTab === 'manuscripts' && (
                <div className="space-y-6">
                    {allSubmissions?.map((sub) => (
                        <div key={sub.id} className="bg-white shadow-card p-6 border-l-4 border-primary flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-accent font-bold bg-grey-100 px-2 py-0.5 uppercase">{sub.status}</span>
                                    <span className="text-[10px] text-muted uppercase">{new Date(sub.created_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-heading font-bold">{sub.title_ru}</h3>
                                <p className="text-xs text-semi-transparent mt-1 italic">ID: {sub.id}</p>
                            </div>

                            {/* Быстрые действия со статусом */}
                            <div className="flex items-center gap-2">
                                {sub.status === 'new' && (
                                    <Button
                                        variant="outline"
                                        className="!py-1 !px-3 !text-[10px] !text-amber-700 !border-amber-700 hover:!bg-amber-700 hover:!text-white"
                                        onClick={() => statusMutation.mutate({ id: sub.id, status: 'under_review' })}
                                    >
                                        В работу {/* // LOC editor.actions.review */}
                                    </Button>
                                )}
                                {sub.status === 'under_review' && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="!py-1 !px-3 !text-[10px] !text-green-700 !border-green-700 hover:!bg-green-700 hover:!text-white"
                                            onClick={() => statusMutation.mutate({ id: sub.id, status: 'accepted' })}
                                        >
                                            Принять {/* // LOC editor.actions.accept */}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="!py-1 !px-3 !text-[10px] !text-red-700 !border-red-700 hover:!bg-red-700 hover:!text-white"
                                            onClick={() => {
                                                const msg = prompt("Причина отклонения:"); // // LOC editor.prompts.reject_reason
                                                if(msg) statusMutation.mutate({ id: sub.id, status: 'rejected', comment: msg });
                                            }}
                                        >
                                            Отклонить {/* // LOC editor.actions.reject */}
                                        </Button>
                                    </>
                                )}
                                {sub.status === 'accepted' && (
                                    <div className="text-[10px] font-accent font-bold text-green-600 uppercase flex items-center gap-1">
                                        <CheckCircle size={14} /> Готова к публикации {/* // LOC editor.status.ready */}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'journal' && (
                <JournalManager />
            )}
        </div>
    );
};

// Вспомогательный компонент для создания Томов/Выпусков
const JournalManager = () => {
    const queryClient = useQueryClient();

    const createVol = async () => {
        const year = parseInt(prompt("Год (например, 2026):") || ""); // // LOC editor.prompts.year
        const num = parseInt(prompt("Номер тома:") || ""); // // LOC editor.prompts.vol_num
        if(year && num) {
            await journalApi.createVolume({ year, number: num, status: 'published' });
            alert("Том создан"); // // LOC editor.alerts.vol_created
            await queryClient.invalidateQueries({queryKey: ['volumes']});
        }
    };

    return (
        <div className="bg-white shadow-card p-8 border-t-4 border-accent space-y-8">
            <div>
                <h2 className="text-xl font-heading mb-4">Структура журнала</h2> {/* // LOC editor.journal.structure */}
                <div className="flex gap-4">
                    <Button onClick={createVol}>
                        <BookPlus size={16} /> Создать новый том {/* // LOC editor.journal.btn_create_vol */}
                    </Button>
                </div>
            </div>

            <div className="p-4 bg-grey-50 border border-dashed border-border text-center text-sm text-muted">
                Здесь вы можете управлять иерархией томов и выпусков. {/* // LOC editor.journal.hint */}
                <br />После создания выпуска вы сможете привязать к нему «Принятые» статьи.
            </div>
        </div>
    );
};
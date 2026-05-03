import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    // ClipboardList,
    // Layers,
    Plus,
    CheckCircle2,
    Clock,
    Library,
    BookOpen,
    Send,
    AlertCircle
} from 'lucide-react';

// API и Типы
import { submissionsApi } from '../../../api/submissions';
import { journalApi } from '../../../api/journal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { SubmissionStatus } from '../../../types/submissions';

/**
 * КОМПОНЕНТ 1: Управление структурой (Тома и Выпуски)
 */
const JournalManager = () => {
    const queryClient = useQueryClient();
    const [newVol, setNewVol] = useState({ year: new Date().getFullYear(), number: 1 });

    // Загрузка томов
    const { data: volumes, isLoading: volsLoading } = useQuery({
        queryKey: ['editor', 'volumes'],
        queryFn: () => journalApi.getVolumes().then(res => res.data)
    });

    const handleCreateVol = async () => {
        try {
            await journalApi.createVolume({ ...newVol, status: 'published' });
            queryClient.invalidateQueries({ queryKey: ['editor', 'volumes'] });
            alert("Том успешно создан"); // // LOC editor.alerts.vol_created
        } catch (err) {
            alert("Ошибка при создании тома");
            console.error(err);
        }
    };

    const handleCreateIssue = async (volId: string) => {
        const num = prompt("Введите номер выпуска (например, 1):"); // // LOC editor.prompts.issue_num
        if (!num) return;

        try {
            await journalApi.createIssue({
                volume_id: volId,
                number: parseInt(num),
                status: 'published',
                publication_date: new Date().toISOString().split('T')[0]
            });
            queryClient.invalidateQueries({ queryKey: ['editor', 'issues'] });
            alert("Выпуск создан и опубликован"); // // LOC editor.alerts.issue_created
        } catch (err) {
            alert("Ошибка при создании выпуска");
            console.error(err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
            {/* Форма создания тома */}
            <div className="lg:col-span-1">
                <div className="bg-white p-8 shadow-card border-t-4 border-accent">
                    <h2 className="text-xl font-heading mb-6 italic flex items-center gap-2">
                        <Plus size={20} className="text-accent" />
                        Новый том {/* // LOC editor.journal.add_volume */}
                    </h2>
                    <div className="space-y-4">
                        <Input
                            label="Год"
                            type="number"
                            value={newVol.year}
                            onChange={e => setNewVol({...newVol, year: parseInt(e.target.value)})}
                        />
                        <Input
                            label="Номер тома"
                            type="number"
                            value={newVol.number}
                            onChange={e => setNewVol({...newVol, number: parseInt(e.target.value)})}
                        />
                        <Button onClick={handleCreateVol} className="w-full mt-2">
                            Создать Том {/* // LOC editor.journal.btn_create_vol */}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Список томов */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="font-accent font-bold uppercase text-xs tracking-widest text-primary flex items-center gap-2">
                    <Library size={16} /> Существующая иерархия {/* // LOC editor.journal.hierarchy */}
                </h2>

                {volsLoading && <p className="text-sm italic">Загрузка...</p>}

                <div className="space-y-4">
                    {volumes?.map(vol => (
                        <div key={vol.id} className="p-5 bg-white border border-border flex justify-between items-center shadow-sm hover:border-primary transition-all">
                            <div>
                                <div className="text-xs font-accent font-bold text-accent uppercase mb-1">{vol.year} год</div>
                                <span className="font-heading text-lg font-bold text-primary">Том {vol.number}</span>
                                {vol.title && <span className="ml-3 text-sm text-muted">— {vol.title}</span>}
                            </div>
                            <Button variant="outline" className="!py-1.5 !px-4 !text-[10px]" onClick={() => handleCreateIssue(vol.id)}>
                                + Добавить выпуск {/* // LOC editor.journal.btn_add_issue */}
                            </Button>
                        </div>
                    ))}
                    {volumes?.length === 0 && (
                        <div className="text-center py-10 bg-white border border-dashed border-border text-muted text-sm italic">
                            Тома еще не созданы {/* // LOC editor.journal.empty */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * ОСНОВНАЯ СТРАНИЦА: ПАНЕЛЬ РЕДАКТОРА
 */
export const EditorDashboard = () => {
    const [activeTab, setActiveTab] = useState<'submissions' | 'journal'>('submissions');
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [selectedIssueId, setSelectedIssueId] = useState<string>('');

    const queryClient = useQueryClient();

    // Загрузка всех рукописей
    const { data: allSubmissions, isLoading: subsLoading } = useQuery({
        queryKey: ['editor', 'all-submissions'],
        queryFn: () => submissionsApi.getAllSubmissions().then(res => res.data)
    });

    // Загрузка всех выпусков (для выпадающего списка публикации)
    const { data: issues } = useQuery({
        queryKey: ['editor', 'all-issues'],
        queryFn: () => journalApi.getAllIssues().then(res => res.data)
    });

    // Мутация смены статуса (editorial workflow)
    const statusMutation = useMutation({
        mutationFn: ({ id, status, comment }: { id: string, status: SubmissionStatus, comment?: string }) =>
            submissionsApi.patchStatus(id, status, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor', 'all-submissions'] });
        }
    });

    // Мутация финальной публикации в журнал
    const publishMutation = useMutation({
        mutationFn: (data: { submission_id: string; issue_id: string }) =>
            journalApi.createPublication({ ...data, status: 'published' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor', 'all-submissions'] });
            queryClient.invalidateQueries({ queryKey: ['current-issue'] });
            setPublishingId(null);
            setSelectedIssueId('');
            alert("Статья успешно опубликована!"); // // LOC editor.alerts.published
        },
        onError: (err: any) => {
            alert(err.response?.data?.detail || "Ошибка при публикации");
        }
    });

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            {/* HEADER ПАНЕЛИ */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
                <div>
                    <h1 className="text-4xl font-heading italic tracking-tight">Панель управления</h1> {/* // LOC editor.title */}
                    <p className="text-muted-foreground mt-2 uppercase text-[10px] font-accent font-bold tracking-[0.2em] flex items-center gap-2">
                        <AlertCircle size={12} className="text-accent" />
                        Режим администратора: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* ТАБЫ */}
                <div className="flex bg-grey-100 p-1 rounded-sm border border-border shadow-inner">
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'submissions' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}
                    >
                        Рукописи {/* // LOC editor.tabs.submissions */}
                    </button>
                    <button
                        onClick={() => setActiveTab('journal')}
                        className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'journal' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}
                    >
                        Журнал {/* // LOC editor.tabs.journal */}
                    </button>
                </div>
            </header>

            {activeTab === 'submissions' ? (
                /* ВКЛАДКА: СПИСОК РУКОПИСЕЙ */
                <div className="space-y-6">
                    {subsLoading && <p className="text-center py-10 font-accent text-xs animate-pulse">Синхронизация с базой данных...</p>}

                    {allSubmissions?.map((sub) => (
                        <div key={sub.id} className="bg-white border-l-4 border-primary shadow-card p-6 flex flex-col md:flex-row justify-between items-center gap-6 group transition-all hover:border-accent">
                            <div className="space-y-2 flex-grow w-full md:w-auto">
                                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-accent font-bold uppercase px-2 py-0.5 bg-primary/5 text-primary border border-primary/20">
                    {sub.status}
                  </span>
                                    <span className="text-[10px] text-muted flex items-center gap-1 font-medium italic">
                    <Clock size={12} /> {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                    {sub.title_ru}
                                </h3>
                            </div>

                            {/* УПРАВЛЕНИЕ СТАТУСАМИ */}
                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                {sub.status === 'new' && (
                                    <Button
                                        variant="outline"
                                        className="!py-1.5 !text-[10px] border-amber-600 text-amber-600 hover:!bg-amber-600"
                                        onClick={() => statusMutation.mutate({ id: sub.id, status: 'under_review' })}
                                    >
                                        В работу {/* // LOC editor.actions.review */}
                                    </Button>
                                )}

                                {sub.status === 'under_review' && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="!py-1.5 !text-[10px] border-green-700 text-green-700 hover:!bg-green-700"
                                            onClick={() => statusMutation.mutate({ id: sub.id, status: 'accepted' })}
                                        >
                                            Принять {/* // LOC editor.actions.accept */}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="!py-1.5 !text-[10px] border-red-700 text-red-700 hover:!bg-red-700"
                                            onClick={() => {
                                                const reason = prompt("Причина отклонения:");
                                                if (reason) statusMutation.mutate({ id: sub.id, status: 'rejected', comment: reason });
                                            }}
                                        >
                                            Отклонить {/* // LOC editor.actions.reject */}
                                        </Button>
                                    </>
                                )}

                                {sub.status === 'accepted' && (
                                    <div className="flex items-center gap-3">
                                        {publishingId === sub.id ? (
                                            <div className="flex items-center gap-2 bg-grey-50 p-2 border border-primary animate-fade-in shadow-lg">
                                                <select
                                                    className="input-field !py-1 text-[10px] w-48"
                                                    value={selectedIssueId}
                                                    onChange={(e) => setSelectedIssueId(e.target.value)}
                                                >
                                                    <option value="">Выберите выпуск...</option>
                                                    {issues?.map(issue => (
                                                        <option key={issue.id} value={issue.id}>
                                                            Выпуск №{issue.number} ({issue.publication_date})
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    disabled={!selectedIssueId || publishMutation.isPending}
                                                    className="!py-1 !px-3 !text-[9px]"
                                                    onClick={() => publishMutation.mutate({ submission_id: sub.id, issue_id: selectedIssueId })}
                                                >
                                                    <Send size={10} />
                                                </Button>
                                                <button onClick={() => setPublishingId(null)} className="text-[10px] text-muted hover:text-red-600 px-2 font-bold uppercase">X</button>
                                            </div>
                                        ) : (
                                            <>
                        <span className="text-[10px] font-accent font-bold text-green-600 uppercase flex items-center gap-1 bg-green-50 px-2 py-1 border border-green-100">
                          <CheckCircle2 size={14} /> Принята
                        </span>
                                                <Button onClick={() => setPublishingId(sub.id)} className="!py-1.5 !text-[10px]">
                                                    Опубликовать {/* // LOC editor.actions.publish */}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {sub.status === 'published' && (
                                    <span className="text-[10px] font-accent font-bold text-primary uppercase flex items-center gap-1 bg-grey-50 px-2 py-1 border border-border">
                     <BookOpen size={14} /> В печати {/* // LOC status.published_label */}
                   </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ВКЛАДКА: УПРАВЛЕНИЕ ЖУРНАЛОМ */
                <JournalManager />
            )}
        </div>
    );
};
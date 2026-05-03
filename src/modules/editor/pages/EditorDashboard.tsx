import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Search,
    Filter,
    Plus,
    CheckCircle2,
    Clock,
    Library,
    BookOpen,
    Send,
    AlertCircle,
    X,
    User as UserIcon,
    // MessageSquare
} from 'lucide-react';

// API и Типы
import { submissionsApi } from '../../../api/submissions';
import { journalApi } from '../../../api/journal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { SubmissionStatus } from '../../../types/submissions';

/**
 * КОНСТАНТЫ ФИЛЬТРАЦИИ
 */
const STATUS_FILTERS: { label: string; value: SubmissionStatus | 'all' }[] = [
    { label: 'Все', value: 'all' }, // // LOC editor.filter.all
    { label: 'Новые', value: 'new' }, // // LOC status.new
    { label: 'В работе', value: 'under_review' }, // // LOC status.under_review
    { label: 'Нужны правки', value: 'revision_required' }, // // LOC status.revision_required
    { label: 'Принятые', value: 'accepted' }, // // LOC status.accepted
    { label: 'Отклоненные', value: 'rejected' }, // // LOC status.rejected
];

/**
 * КОМПОНЕНТ 1: Управление структурой (Тома и Выпуски)
 */
const JournalManager = () => {
    const queryClient = useQueryClient();
    const [newVol, setNewVol] = useState({ year: new Date().getFullYear(), number: 1 });

    const { data: volumes } = useQuery({
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
        const num = prompt("Введите номер выпуска (например, 1):");
        if (!num) return;
        try {
            await journalApi.createIssue({
                volume_id: volId,
                number: parseInt(num),
                status: 'published',
                publication_date: new Date().toISOString().split('T')[0]
            });
            queryClient.invalidateQueries({ queryKey: ['editor', 'all-issues'] });
            alert("Выпуск создан");
        } catch (err) {
            alert("Ошибка при создании выпуска");
            console.error(err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
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
                        <Button onClick={handleCreateVol} className="w-full">Создать Том</Button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <h2 className="font-accent font-bold uppercase text-xs tracking-widest text-primary flex items-center gap-2">
                    <Library size={16} /> Текущая структура
                </h2>
                <div className="space-y-4">
                    {volumes?.map(vol => (
                        <div key={vol.id} className="p-5 bg-white border border-border flex justify-between items-center shadow-sm hover:border-primary transition-all">
                            <div>
                                <div className="text-xs font-accent font-bold text-accent uppercase">{vol.year} год</div>
                                <span className="font-heading text-lg font-bold text-primary">Том {vol.number}</span>
                            </div>
                            <Button variant="outline" className="!py-1.5 !px-4 !text-[10px]" onClick={() => handleCreateIssue(vol.id)}>
                                + Добавить выпуск
                            </Button>
                        </div>
                    ))}
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
    const [filterStatus, setFilterStatus] = useState<SubmissionStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [selectedIssueId, setSelectedIssueId] = useState<string>('');

    const queryClient = useQueryClient();

    // 1. Загрузка статей (с фильтром по статусу на стороне бэкенда)
    const { data: allSubmissions, isLoading: subsLoading } = useQuery({
        queryKey: ['editor', 'submissions', filterStatus],
        queryFn: () => submissionsApi.getAllSubmissions(filterStatus === 'all' ? undefined : filterStatus).then(res => res.data)
    });

    // 2. Загрузка выпусков
    const { data: issues } = useQuery({
        queryKey: ['editor', 'all-issues'],
        queryFn: () => journalApi.getAllIssues().then(res => res.data)
    });

    // Локальный поиск (по названию или ID)
    const filteredSubmissions = allSubmissions?.filter(sub =>
        sub.title_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Мутации
    const statusMutation = useMutation({
        mutationFn: ({ id, status, comment }: { id: string, status: SubmissionStatus, comment?: string }) =>
            submissionsApi.patchStatus(id, status, comment),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['editor', 'submissions'] })
    });

    const publishMutation = useMutation({
        mutationFn: (data: { submission_id: string; issue_id: string }) =>
            journalApi.createPublication({ ...data, status: 'published' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor', 'submissions'] });
            queryClient.invalidateQueries({ queryKey: ['current-issue'] });
            setPublishingId(null);
            alert("Статья опубликована!");
        }
    });

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            {/* HEADER */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
                <div>
                    <h1 className="text-4xl font-heading italic tracking-tight text-primary">Редакция</h1>
                    <p className="text-muted-foreground mt-2 uppercase text-[10px] font-accent font-bold tracking-[0.2em] flex items-center gap-2">
                        <AlertCircle size={12} className="text-accent" />
                        Управление контентом: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="flex bg-grey-100 p-1 rounded-sm border border-border shadow-inner">
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'submissions' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}
                    >
                        Рукописи
                    </button>
                    <button
                        onClick={() => setActiveTab('journal')}
                        className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all ${activeTab === 'journal' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}
                    >
                        Журнал
                    </button>
                </div>
            </header>

            {activeTab === 'submissions' ? (
                <div className="space-y-8 animate-fade-in">

                    {/* ТУЛБАР: Поиск и Фильтры */}
                    <div className="bg-white shadow-sm border border-border p-4 flex flex-col lg:flex-row gap-6 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-2.5 text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Поиск по названию или ID..."
                                className="input-field pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-muted hover:text-primary">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                            <Filter size={14} className="text-muted mr-2" />
                            {STATUS_FILTERS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setFilterStatus(f.value)}
                                    className={`px-3 py-1.5 text-[9px] font-accent font-bold uppercase tracking-tighter rounded-full border transition-all ${filterStatus === f.value ? 'bg-accent text-white border-accent' : 'bg-white text-muted border-border hover:border-primary'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* СПИСОК */}
                    <div className="space-y-4">
                        {subsLoading ? (
                            <p className="text-center py-20 font-accent text-xs animate-pulse tracking-widest">Загрузка данных...</p>
                        ) : filteredSubmissions && filteredSubmissions.length > 0 ? (
                            filteredSubmissions.map((sub) => (
                                <div key={sub.id} className="bg-white border-l-4 border-primary shadow-card p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-accent transition-all">
                                    <div className="space-y-2 flex-grow">
                                        <div className="flex items-center gap-3">
                      <span className="text-[9px] font-accent font-bold uppercase px-2 py-0.5 bg-primary/5 text-primary border border-primary/20">
                        {sub.status}
                      </span>
                                            <span className="text-[10px] text-muted flex items-center gap-1">
                        <Clock size={12} /> {new Date(sub.created_at).toLocaleDateString()}
                      </span>
                                        </div>
                                        <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">{sub.title_ru}</h3>
                                        <div className="flex items-center gap-2 text-[10px] text-semi-transparent uppercase font-bold">
                                            <UserIcon size={12} className="text-accent" />
                                            ID Автора: {sub.author_id.split('-')[0]}...
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        {/* Логика кнопок смены статуса */}
                                        {sub.status === 'new' && (
                                            <Button variant="outline" className="!py-1.5 !text-[10px] border-amber-600 text-amber-600 hover:!bg-amber-600"
                                                    onClick={() => statusMutation.mutate({ id: sub.id, status: 'under_review' })}>
                                                В работу
                                            </Button>
                                        )}

                                        {sub.status === 'under_review' && (
                                            <>
                                                <Button variant="outline" className="!py-1.5 !text-[10px] border-green-700 text-green-700 hover:!bg-green-700"
                                                        onClick={() => statusMutation.mutate({ id: sub.id, status: 'accepted' })}>
                                                    Принять
                                                </Button>
                                                <Button variant="outline" className="!py-1.5 !text-[10px] border-purple-700 text-purple-700 hover:!bg-purple-700"
                                                        onClick={() => {
                                                            const note = prompt("Что нужно исправить?"); // // LOC editor.prompts.revision
                                                            if(note) statusMutation.mutate({ id: sub.id, status: 'revision_required', comment: note });
                                                        }}>
                                                    Правки
                                                </Button>
                                                <Button variant="outline" className="!py-1.5 !text-[10px] border-red-700 text-red-700 hover:!bg-red-700"
                                                        onClick={() => {
                                                            const reason = prompt("Причина отказа:");
                                                            if(reason) statusMutation.mutate({ id: sub.id, status: 'rejected', comment: reason });
                                                        }}>
                                                    Отклонить
                                                </Button>
                                            </>
                                        )}

                                        {/* Логика публикации */}
                                        {sub.status === 'accepted' && (
                                            <div className="flex items-center gap-3">
                                                {publishingId === sub.id ? (
                                                    <div className="flex items-center gap-2 bg-grey-50 p-2 border border-primary animate-fade-in shadow-lg">
                                                        <select className="input-field !py-1 text-[10px] w-48"
                                                                value={selectedIssueId} onChange={(e) => setSelectedIssueId(e.target.value)}>
                                                            <option value="">Выберите выпуск...</option>
                                                            {issues?.map(issue => (
                                                                <option key={issue.id} value={issue.id}>Выпуск №{issue.number} ({issue.publication_date})</option>
                                                            ))}
                                                        </select>
                                                        <Button disabled={!selectedIssueId} className="!py-1 !px-3 !text-[9px]"
                                                                onClick={() => publishMutation.mutate({ submission_id: sub.id, issue_id: selectedIssueId })}>
                                                            <Send size={10} />
                                                        </Button>
                                                        <button onClick={() => setPublishingId(null)} className="text-[10px] text-muted px-2 uppercase font-bold">X</button>
                                                    </div>
                                                ) : (
                                                    <>
                            <span className="text-[10px] font-accent font-bold text-green-600 uppercase flex items-center gap-1">
                              <CheckCircle2 size={14} /> Принята
                            </span>
                                                        <Button onClick={() => setPublishingId(sub.id)} className="!py-1.5 !text-[10px]">
                                                            Опубликовать
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {sub.status === 'published' && (
                                            <span className="text-[10px] font-accent font-bold text-primary uppercase flex items-center gap-1 bg-grey-50 px-2 py-1 border border-border">
                         <BookOpen size={14} /> В печати
                       </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white border border-dashed border-border text-muted italic">
                                Нет статей, соответствующих фильтру {/* // LOC editor.list.empty */}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <JournalManager />
            )}
        </div>
    );
};
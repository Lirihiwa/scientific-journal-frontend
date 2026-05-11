// src/pages/editor/EditorDashboard.tsx
import {useMemo, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AlertCircle, CheckCircle2, Eye, FileText, Inbox, Layers, Search, Send, XCircle} from 'lucide-react';
import {toast} from 'sonner';
import {editorApi} from '../../features/editor/api/editor.api';
import {Button} from '../../shared/ui/Button';
import {Input} from '../../shared/ui/Input';
import {TextArea} from '../../shared/ui/TextArea';
import {Modal} from '../../shared/ui/Modal';
import {Badge} from '../../shared/ui/Bagde';
import {JournalStructure} from '../../widgets/editor/ui/JournalStructure';
import {PageHeader} from '../../shared/ui/PageHeader';
import {Card} from '../../shared/ui/Card';
import {SkeletonList} from '../../shared/ui/Skeleton';
import {cn} from '../../shared/lib/utils';
import type {SubmissionStatus} from '../../entities/submission/model/types';
import {apiClient} from "../../shared/api/client.ts";
import type {Issue} from '../../entities/journal/model/types.ts';
import {SubmissionCard} from "../../widgets/submission/ui/SubmissionCard.tsx";
import { PageContainer } from "../../shared/ui/PageContainer.tsx";

export const EditorDashboard = () => {
    const [activeTab, setActiveTab] = useState<'papers' | 'structure'>('papers');
    const [filter, setFilter] = useState<SubmissionStatus | 'all'>('all');
    const [search, setSearch] = useState('');
    const [decisionModal, setDecisionModal] = useState<{
        isOpen: boolean;
        subId: string;
        target: SubmissionStatus | null
    }>({isOpen: false, subId: '', target: null});
    const [comment, setComment] = useState('');
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [selectedIssue, setSelectedIssue] = useState('');

    const queryClient = useQueryClient();

    // Запрашиваем ВСЕ статьи для подсчета статистики в плитках
    const {data: allSubmissions, isLoading} = useQuery({
        queryKey: ['editor-submissions', 'all'],
        queryFn: () => editorApi.getAllSubmissions()
    });

    const {data: issues} = useQuery({
        queryKey: ['editor-all-issues'],
        queryFn: () => apiClient.get('/journal/issues').then(res => res.data)
    });

    const statusMutation = useMutation({
        mutationFn: (vars: {
            id: string,
            status: SubmissionStatus,
            comment?: string
        }) => editorApi.updateStatus(vars.id, vars.status, vars.comment),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['editor-submissions']});
            setDecisionModal({isOpen: false, subId: '', target: null});
            setComment('');
            toast.success("Статус обновлен");
        }
    });

    const publishMutation = useMutation({
        mutationFn: (vars: { subId: string, issueId: string }) => editorApi.publishToIssue({
            submission_id: vars.subId,
            issue_id: vars.issueId,
            status: 'published'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['editor-submissions']});
            setPublishingId(null);
            toast.success("Статья опубликована в выпуске");
        }
    });

    // Фильтрация на клиенте
    const filteredList = useMemo(() => {
        let list = allSubmissions || [];
        if (filter !== 'all') list = list.filter(s => s.status === filter);
        if (search) list = list.filter(s => s.title_ru.toLowerCase().includes(search.toLowerCase()));
        return list;
    }, [allSubmissions, filter, search]);

    // Подсчет статистики для дашборда
    const stats = useMemo(() => {
        if (!allSubmissions) return {all: 0, new: 0, review: 0, revision: 0, accepted: 0, published: 0, rejected: 0};
        return {
            all: allSubmissions.length,
            new: allSubmissions.filter(s => s.status === 'new').length,
            review: allSubmissions.filter(s => s.status === 'under_review').length,
            revision: allSubmissions.filter(s => s.status === 'revision_required').length,
            accepted: allSubmissions.filter(s => s.status === 'accepted').length,
            published: allSubmissions.filter(s => s.status === 'published').length,
            rejected: allSubmissions.filter(s => s.status === 'rejected').length,
        };
    }, [allSubmissions]);

    // Конфигурация 7 плиток фильтрации
    const dashboardTiles = [
        {
            id: 'all',
            label: 'Все',
            count: stats.all,
            icon: Layers,
            color: 'text-foreground',
            bg: 'bg-muted/10',
            border: 'border-border',
            activeRing: 'ring-primary'
        },
        {
            id: 'new',
            label: 'Новые',
            count: stats.new,
            icon: Inbox,
            color: 'text-status-new',
            bg: 'bg-status-new/5',
            border: 'border-status-new/20',
            activeRing: 'ring-status-new'
        },
        {
            id: 'under_review',
            label: 'На рецензии',
            count: stats.review,
            icon: Eye,
            color: 'text-status-review',
            bg: 'bg-status-review/5',
            border: 'border-status-review/20',
            activeRing: 'ring-status-review'
        },
        {
            id: 'revision_required',
            label: 'На доработке',
            count: stats.revision,
            icon: AlertCircle,
            color: 'text-status-revision',
            bg: 'bg-status-revision/5',
            border: 'border-status-revision/20',
            activeRing: 'ring-status-revision'
        },
        {
            id: 'accepted',
            label: 'Принятые',
            count: stats.accepted,
            icon: CheckCircle2,
            color: 'text-status-accepted',
            bg: 'bg-status-accepted/5',
            border: 'border-status-accepted/20',
            activeRing: 'ring-status-accepted'
        },
        {
            id: 'published',
            label: 'Опубликованы',
            count: stats.published,
            icon: FileText,
            color: 'text-status-published',
            bg: 'bg-status-published/5',
            border: 'border-status-published/20',
            activeRing: 'ring-status-published'
        },
        {
            id: 'rejected',
            label: 'Отклонены',
            count: stats.rejected,
            icon: XCircle,
            color: 'text-status-rejected',
            bg: 'bg-status-rejected/5',
            border: 'border-status-rejected/20',
            activeRing: 'ring-status-rejected'
        },
    ] as const;

    return (
        <PageContainer className="space-y-12">
            <PageHeader
                title="Editorial Panel"
                subtitle="Management Console"
                action={
                    <div className="flex bg-muted p-1 rounded-sm ring-1 ring-border">
                        <button onClick={() => setActiveTab('papers')}
                                className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all rounded-sm ${activeTab === 'papers' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-primary'}`}>Manuscripts
                        </button>
                        <button onClick={() => setActiveTab('structure')}
                                className={`px-8 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all rounded-sm ${activeTab === 'structure' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-primary'}`}>Journal
                            Structure
                        </button>
                    </div>
                }
            />

            {activeTab === 'papers' ? (
                <div className="space-y-8">
                    {/* Плитки-фильтры со статистикой */}
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
                        {dashboardTiles.map((t) => {
                            const isActive = filter === t.id;
                            const Icon = t.icon;
                            return (
                                <Card
                                    key={t.id}
                                    padding="sm"
                                    className={cn(
                                        "cursor-pointer transition-all",
                                        t.bg,
                                        isActive ? `ring-2 ${t.activeRing} border-transparent shadow-md` : `${t.border} hover:border-foreground/20 hover:shadow-sm`
                                    )}
                                    onClick={() => setFilter(t.id as SubmissionStatus | 'all')}
                                >
                                    <div className="flex items-center justify-between">
                                        <Icon size={16} className={t.color}/>
                                        <span className="text-2xl font-heading font-bold">{t.count}</span>
                                    </div>
                                    <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mt-2">{t.label}</p>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Строка поиска (без старых кнопок фильтров) */}
                    <div className="flex bg-card border border-border p-4 shadow-sm rounded-sm">
                        <Input
                            placeholder="Поиск статьи по названию..."
                            icon={<Search size={18}/>}
                            className="bg-muted/30 border-none focus:ring-0 max-w-lg"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Список рукописей */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <SkeletonList count={4} className="h-32"/>
                        ) : filteredList?.map(sub => (
                            <SubmissionCard
                                key={sub.id}
                                submission={sub}
                                showLink={false}
                                actions={
                                    <div className="flex gap-2">
                                        {sub.status === 'new' && (
                                            <Button onClick={() => statusMutation.mutate({
                                                id: sub.id,
                                                status: 'under_review'
                                            })}>
                                                В работу
                                            </Button>
                                        )}

                                        {sub.status === 'under_review' && (
                                            <>
                                                <Button variant="outline"
                                                        className="text-status-accepted border-status-accepted/30 hover:bg-status-accepted/10"
                                                        onClick={() => statusMutation.mutate({
                                                            id: sub.id,
                                                            status: 'accepted'
                                                        })}>Принять</Button>
                                                <Button variant="outline"
                                                        className="text-status-revision border-status-revision/30 hover:bg-status-revision/10"
                                                        onClick={() => setDecisionModal({
                                                            isOpen: true,
                                                            subId: sub.id,
                                                            target: 'revision_required'
                                                        })}>Правки</Button>
                                                <Button variant="outline"
                                                        className="text-status-rejected border-status-rejected/30 hover:bg-status-rejected/10"
                                                        onClick={() => setDecisionModal({
                                                            isOpen: true,
                                                            subId: sub.id,
                                                            target: 'rejected'
                                                        })}>Отклонить</Button>
                                            </>
                                        )}

                                        {sub.status === 'accepted' && (
                                            publishingId === sub.id ? (
                                                <div className="flex items-center gap-2 animate-fade-in">
                                                    <select
                                                        className="h-10 px-3 bg-muted border border-border text-[10px] font-bold uppercase font-accent outline-none rounded-sm"
                                                        value={selectedIssue}
                                                        onChange={e => setSelectedIssue(e.target.value)}>
                                                        <option value="">Выпуск...</option>
                                                        {issues?.map((i: Issue) => <option key={i.id}
                                                                                           value={i.id}>№{i.number} ({i.publication_date ? new Date(i.publication_date).getFullYear() : '—'})</option>)}
                                                    </select>
                                                    <Button size="icon" disabled={!selectedIssue}
                                                            onClick={() => publishMutation.mutate({
                                                                subId: sub.id,
                                                                issueId: selectedIssue
                                                            })}><Send size={16}/></Button>
                                                    <button onClick={() => setPublishingId(null)}
                                                            className="text-[10px] font-bold p-2 text-muted-foreground hover:text-foreground">✕
                                                    </button>
                                                </div>
                                            ) : <Button onClick={() => setPublishingId(sub.id)}>Опубликовать</Button>
                                        )}
                                        {sub.status === 'published' && <Badge variant="published">В выпуске</Badge>}
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            ) : <JournalStructure/>}

            <Modal isOpen={decisionModal.isOpen} onClose={() => setDecisionModal({...decisionModal, isOpen: false})}
                   title={decisionModal.target === 'rejected' ? "Отказ в публикации" : "Запрос правок"}>
                <div className="space-y-6">
                    <TextArea label="Комментарий редактора (будет виден автору)" rows={6} value={comment}
                              onChange={e => setComment(e.target.value)} placeholder="Опишите причину решения..."/>
                    <div className="flex gap-3">
                        <Button className="flex-grow" disabled={!comment.trim() || statusMutation.isPending}
                                onClick={() => statusMutation.mutate({
                                    id: decisionModal.subId,
                                    status: decisionModal.target!,
                                    comment
                                })}>Подтвердить вердикт</Button>
                        <Button variant="ghost"
                                onClick={() => setDecisionModal({...decisionModal, isOpen: false})}>Отмена</Button>
                    </div>
                </div>
            </Modal>
        </PageContainer>
    );
};
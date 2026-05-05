// src/pages/editor/EditorDashboard.tsx
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Clock, FileText, Search, Send} from 'lucide-react';
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
import type {SubmissionStatus} from '../../entities/submission/model/types';
import {apiClient} from "../../shared/api/client.ts";

const statusFilters: { key: SubmissionStatus | 'all'; label: string }[] = [
    {key: 'all', label: 'Все'}, {key: 'new', label: 'Новые'}, {key: 'under_review', label: 'Рецензия'},
    {key: 'revision_required', label: 'Правки'}, {key: 'accepted', label: 'Принятые'}
];

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
    const {data: submissions, isLoading} = useQuery({
        queryKey: ['editor-submissions', filter],
        queryFn: () => editorApi.getAllSubmissions(filter === 'all' ? undefined : filter)
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
        mutationFn: (vars: { subId: string, issueId: string }) => editorApi.publishToIssue(vars.subId, vars.issueId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['editor-submissions']});
            setPublishingId(null);
            toast.success("Статья опубликована в выпуске");
        }
    });

    const filteredList = submissions?.filter(s => s.title_ru.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-12 animate-fade-in">
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
                    <div className="flex flex-col lg:flex-row gap-6 bg-card border border-border p-4 shadow-sm">
                        <Input placeholder="Поиск по названию..." icon={<Search size={18}/>}
                               className="bg-muted/30 border-none focus:ring-0" value={search}
                               onChange={e => setSearch(e.target.value)}/>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-academic">
                            {statusFilters.map((f) => (
                                <button key={f.key} onClick={() => setFilter(f.key)}
                                        className={`whitespace-nowrap px-4 py-1.5 text-[9px] font-accent font-bold uppercase tracking-tight border transition-all rounded-sm ${filter === f.key ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:border-primary'}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                            <SkeletonList count={4} className="h-32"/>
                        ) : filteredList?.map(sub => (
                            <Card key={sub.id} variant="interactive" padding="lg">
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                    <div className="space-y-3 flex-grow">
                                        <div className="flex items-center gap-4">
                                            <Badge variant={sub.status}>{sub.status.replace('_', ' ')}</Badge>
                                            <span
                                                className="text-[10px] font-accent font-bold text-muted-foreground italic uppercase flex items-center gap-1"><Clock
                                                size={12}/> ID: {sub.id.slice(0, 8)}</span>
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold italic leading-tight">{sub.title_ru}</h3>
                                        <p className="text-xs text-muted-foreground font-accent font-bold uppercase tracking-widest flex items-center gap-2">
                                            <FileText size={14}
                                                      className="text-primary"/> {new Date(sub.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        {sub.status === 'new' && <Button
                                            onClick={() => statusMutation.mutate({id: sub.id, status: 'under_review'})}>В
                                            работу</Button>}
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
                                                        <option value=" ">Выпуск...</option>
                                                        {issues?.map((i: any) => <option key={i.id}
                                                                                         value={i.id}>№{i.number} ({new Date(i.publication_date).getFullYear()})</option>)}
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
                                </div>
                            </Card>
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
        </div>
    );
};
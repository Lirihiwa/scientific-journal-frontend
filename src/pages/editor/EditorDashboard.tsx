// src/pages/editor/EditorDashboard.tsx
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle2, Eye, FileText, Inbox, Layers, Search, Send, XCircle } from 'lucide-react';
import { toast } from 'sonner';

import { editorApi } from '../../features/editor/api/editor.api';
import { journalApi } from '../../entities/journal/api/journal.api';
import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';
import { TextArea } from '../../shared/ui/TextArea';
import { Modal } from '../../shared/ui/Modal';
import { Badge } from '../../shared/ui/Bagde';
import { JournalStructure } from '../../widgets/editor/ui/JournalStructure';
import { PageHeader } from '../../shared/ui/PageHeader';
import { Card } from '../../shared/ui/Card';
import { SkeletonList } from '../../shared/ui/Skeleton';
import { cn } from '../../shared/lib/utils';
import type { SubmissionStatus } from '../../entities/submission/model/types';
import type { Issue } from '../../entities/journal/model/types.ts';
import { SubmissionCard } from "../../widgets/submission/ui/SubmissionCard.tsx";
import { PageContainer } from "../../shared/ui/PageContainer.tsx";

export const EditorDashboard = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const [activeTab, setActiveTab] = useState<'papers' | 'structure'>('papers');
    const [filter, setFilter] = useState<SubmissionStatus | 'all'>('all');
    const [search, setSearch] = useState('');
    const [decisionModal, setDecisionModal] = useState<{
        isOpen: boolean;
        subId: string;
        target: SubmissionStatus | null
    }>({ isOpen: false, subId: '', target: null });

    const [comment, setComment] = useState('');
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [selectedIssue, setSelectedIssue] = useState('');

    const queryClient = useQueryClient();

    // Загрузка заявок
    const { data: allSubmissions, isLoading: isSubmissionsLoading } = useQuery({
        queryKey: ['editor-submissions', 'all'],
        queryFn: () => editorApi.getAllSubmissions()
    });

    // Загрузка выпусков
    const { data: issues } = useQuery({
        queryKey: ['editor-all-issues'],
        queryFn: async () => {
            const volumes = await journalApi.getVolumes();
            if (!volumes.length) return [];
            return await journalApi.getIssues(volumes[0].id);
        }
    });

    const statusMutation = useMutation({
        mutationFn: (vars: { id: string, status: SubmissionStatus, comment?: string }) =>
            editorApi.updateStatus(vars.id, vars.status, vars.comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-submissions'] });
            setDecisionModal({ isOpen: false, subId: '', target: null });
            setComment('');
            toast.success(isRu ? "Статус обновлен" : "Status updated");
        }
    });

    const publishMutation = useMutation({
        mutationFn: (vars: { subId: string, issueId: string }) => editorApi.publishToIssue({
            submission_id: vars.subId,
            issue_id: vars.issueId,
            status: 'published'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-submissions'] });
            setPublishingId(null);
            toast.success(isRu ? "Статья опубликована" : "Article published");
        }
    });

    const filteredList = useMemo(() => {
        let list = allSubmissions || [];
        if (filter !== 'all') list = list.filter(s => s.status === filter);
        if (search) list = list.filter(s => s.title_ru.toLowerCase().includes(search.toLowerCase()));
        return list;
    }, [allSubmissions, filter, search]);

    const stats = useMemo(() => {
        if (!allSubmissions) return { all: 0, new: 0, review: 0, revision: 0, accepted: 0, published: 0, rejected: 0 };
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

    const dashboardTiles = [
        { id: 'all', label: t('common.all'), count: stats.all, icon: Layers, color: 'text-foreground', bg: 'bg-muted/10', border: 'border-border', activeRing: 'ring-primary' },
        { id: 'new', label: t('submission.status.new'), count: stats.new, icon: Inbox, color: 'text-status-new', bg: 'bg-status-new/5', border: 'border-status-new/20', activeRing: 'ring-status-new' },
        { id: 'under_review', label: t('submission.status.under_review'), count: stats.review, icon: Eye, color: 'text-status-review', bg: 'bg-status-review/5', border: 'border-status-review/20', activeRing: 'ring-status-review' },
        { id: 'revision_required', label: t('submission.status.revision_required'), count: stats.revision, icon: AlertCircle, color: 'text-status-revision', bg: 'bg-status-revision/5', border: 'border-status-revision/20', activeRing: 'ring-status-revision' },
        { id: 'accepted', label: t('submission.status.accepted'), count: stats.accepted, icon: CheckCircle2, color: 'text-status-accepted', bg: 'bg-status-accepted/5', border: 'border-status-accepted/20', activeRing: 'ring-status-accepted' },
        { id: 'published', label: t('submission.status.published'), count: stats.published, icon: FileText, color: 'text-status-published', bg: 'bg-status-published/5', border: 'border-status-published/20', activeRing: 'ring-status-published' },
        { id: 'rejected', label: t('submission.status.rejected'), count: stats.rejected, icon: XCircle, color: 'text-status-rejected', bg: 'bg-status-rejected/5', border: 'border-status-rejected/20', activeRing: 'ring-status-rejected' },
    ] as const;

    return (
        <PageContainer className="space-y-12">
            <PageHeader
                title={t('nav.editor_panel')}
                subtitle="Editorial Control Panel"
                action={
                    <div className="flex bg-muted p-1 rounded-sm ring-1 ring-border">
                        <button onClick={() => setActiveTab('papers')}
                                className={cn("px-6 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all rounded-sm", activeTab === 'papers' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-primary')}>
                            {isRu ? 'Рукописи' : 'Manuscripts'}
                        </button>
                        <button onClick={() => setActiveTab('structure')}
                                className={cn("px-6 py-2 text-[10px] font-accent font-bold uppercase tracking-widest transition-all rounded-sm", activeTab === 'structure' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-primary')}>
                            {isRu ? 'Структура' : 'Structure'}
                        </button>
                    </div>
                }
            />

            {activeTab === 'papers' ? (
                <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
                        {dashboardTiles.map((t) => (
                            <Card
                                key={t.id}
                                padding="sm"
                                className={cn("cursor-pointer transition-all", t.bg, filter === t.id ? `ring-2 ${t.activeRing} border-transparent shadow-md` : `${t.border} hover:border-foreground/20`)}
                                onClick={() => setFilter(t.id as SubmissionStatus | 'all')}
                            >
                                <div className="flex items-center justify-between">
                                    <t.icon size={16} className={t.color}/>
                                    <span className="text-2xl font-heading font-bold">{t.count}</span>
                                </div>
                                <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mt-2">{t.label}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="flex bg-card border border-border p-4 shadow-sm rounded-sm">
                        <Input
                            placeholder={t('common.search')}
                            icon={<Search size={18}/>}
                            className="bg-muted/30 border-none focus:ring-0 max-w-lg"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {isSubmissionsLoading ? (
                            <SkeletonList count={4} className="h-32"/>
                        ) : filteredList?.map(sub => (
                            <SubmissionCard
                                key={sub.id}
                                submission={sub}
                                showLink={false}
                                actions={
                                    <div className="flex gap-2">
                                        {sub.status === 'new' && <Button onClick={() => statusMutation.mutate({ id: sub.id, status: 'under_review' })}>{isRu ? 'В работу' : 'Start Review'}</Button>}
                                        {sub.status === 'under_review' && (
                                            <>
                                                <Button variant="outline" className="text-status-accepted border-status-accepted/30 hover:bg-status-accepted/10" onClick={() => statusMutation.mutate({ id: sub.id, status: 'accepted' })}>{isRu ? 'Принять' : 'Accept'}</Button>
                                                <Button variant="outline" className="text-status-revision border-status-revision/30 hover:bg-status-revision/10" onClick={() => setDecisionModal({ isOpen: true, subId: sub.id, target: 'revision_required' })}>{isRu ? 'Правки' : 'Revision'}</Button>
                                                <Button variant="outline" className="text-status-rejected border-status-rejected/30 hover:bg-status-rejected/10" onClick={() => setDecisionModal({ isOpen: true, subId: sub.id, target: 'rejected' })}>{isRu ? 'Отклонить' : 'Reject'}</Button>
                                            </>
                                        )}
                                        {sub.status === 'accepted' && (
                                            publishingId === sub.id ? (
                                                <div className="flex items-center gap-2 animate-fade-in">
                                                    <select className="h-10 px-3 bg-muted border border-border text-[10px] font-bold uppercase font-accent outline-none rounded-sm" value={selectedIssue} onChange={e => setSelectedIssue(e.target.value)}>
                                                        <option value="">{isRu ? 'Выпуск...' : 'Issue...'}</option>
                                                        {issues?.map((i: Issue) => <option key={i.id} value={i.id}>№{i.number} ({i.publication_date ? new Date(i.publication_date).getFullYear() : '—'})</option>)}
                                                    </select>
                                                    <Button size="icon" disabled={!selectedIssue} onClick={() => publishMutation.mutate({ subId: sub.id, issueId: selectedIssue })}><Send size={16}/></Button>
                                                    <button onClick={() => setPublishingId(null)} className="text-[10px] p-2 text-muted-foreground hover:text-foreground">✕</button>
                                                </div>
                                            ) : <Button onClick={() => setPublishingId(sub.id)}>{isRu ? 'Опубликовать' : 'Publish'}</Button>
                                        )}
                                        {sub.status === 'published' && <Badge variant="published">{t('submission.status.published')}</Badge>}
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            ) : <JournalStructure />}

            <Modal
                isOpen={decisionModal.isOpen}
                onClose={() => setDecisionModal({...decisionModal, isOpen: false})}
                title={decisionModal.target === 'rejected' ? (isRu ? "Отказ в публикации" : "Publication Rejection") : (isRu ? "Запрос правок" : "Revision Request")}
            >
                <div className="space-y-6">
                    <TextArea
                        label={isRu ? "Комментарий" : "Comment"}
                        rows={6}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder={isRu ? "Причина решения..." : "Decision rationale..."}
                    />
                    <div className="flex gap-3">
                        <Button className="flex-grow" isLoading={statusMutation.isPending} disabled={!comment.trim()} onClick={() => statusMutation.mutate({ id: decisionModal.subId, status: decisionModal.target!, comment })}>
                            {isRu ? 'Подтвердить' : 'Confirm'}
                        </Button>
                        <Button variant="ghost" onClick={() => setDecisionModal({...decisionModal, isOpen: false})}>
                            {t('common.cancel')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </PageContainer>
    );
};
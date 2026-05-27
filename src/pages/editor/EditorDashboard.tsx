import { AlertCircle, CheckCircle2, Eye, FileText, Inbox, Layers, Search, Send, XCircle } from 'lucide-react';
import { useEditorDashboard } from '../../features/editor/hooks/useEditorDashboard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { JournalStructure } from '../../features/editor/components/JournalStructure';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SkeletonList } from '../../components/ui/Skeleton';
import { cn } from '../../utils/cn';
import type { SubmissionStatus } from '../../features/submission/submission.types';
import type { Issue } from '../../features/journal/journal.types';
import { SubmissionCard } from "../../features/submission/components/SubmissionCard";
import { PageContainer } from "../../components/ui/PageContainer";

export const EditorDashboard = () => {
    const {
        activeTab,
        setActiveTab,
        filter,
        setFilter,
        search,
        setSearch,
        decisionModal,
        setDecisionModal,
        comment,
        setComment,
        publishingId,
        setPublishingId,
        selectedIssue,
        setSelectedIssue,
        isSubmissionsLoading,
        issues,
        filteredList,
        stats,
        statusMutation,
        publishMutation,
        t,
        isRu
    } = useEditorDashboard();

    const dashboardTiles = [
        { id: 'all', label: t('common.all'), count: stats.all, icon: Layers, activeColor: 'text-foreground', activeBg: 'bg-muted/30', activeBorder: 'border-foreground/30' },
        { id: 'new', label: t('submission.status.new'), count: stats.new, icon: Inbox, activeColor: 'text-status-new', activeBg: 'bg-status-new/5', activeBorder: 'border-status-new/30' },
        { id: 'under_review', label: t('submission.status.under_review'), count: stats.review, icon: Eye, activeColor: 'text-status-review', activeBg: 'bg-status-review/5', activeBorder: 'border-status-review/30' },
        { id: 'revision_required', label: t('submission.status.revision_required'), count: stats.revision, icon: AlertCircle, activeColor: 'text-status-revision', activeBg: 'bg-status-revision/5', activeBorder: 'border-status-revision/30' },
        { id: 'accepted', label: t('submission.status.accepted'), count: stats.accepted, icon: CheckCircle2, activeColor: 'text-status-accepted', activeBg: 'bg-status-accepted/5', activeBorder: 'border-status-accepted/30' },
        { id: 'published', label: t('submission.status.published'), count: stats.published, icon: FileText, activeColor: 'text-status-published', activeBg: 'bg-status-published/5', activeBorder: 'border-status-published/30' },
        { id: 'rejected', label: t('submission.status.rejected'), count: stats.rejected, icon: XCircle, activeColor: 'text-status-rejected', activeBg: 'bg-status-rejected/5', activeBorder: 'border-status-rejected/30' },
    ] as const;

    return (
        <PageContainer className="space-y-10">
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
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
                        {dashboardTiles.map((tile) => {
                            const isActive = filter === tile.id;
                            return (
                                <Card
                                    key={tile.id}
                                    padding="sm"
                                    className={cn(
                                        "cursor-pointer transition-all duration-200 h-full flex flex-col justify-between border",
                                        isActive
                                            ? `${tile.activeBg} ${tile.activeBorder} shadow-sm ring-1 ring-offset-0`
                                            : "bg-card border-border/60 hover:border-border hover:bg-muted/10"
                                    )}
                                    onClick={() => setFilter(tile.id as SubmissionStatus | 'all')}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <tile.icon size={15} className={isActive ? tile.activeColor : "text-muted-foreground/80"} />
                                        <span className="text-xl md:text-2xl font-heading font-bold leading-none">{tile.count}</span>
                                    </div>
                                    <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mt-3 truncate">
                                        {tile.label}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="max-w-md w-full">
                        <Input
                            placeholder={t('common.search')}
                            icon={<Search size={16} />}
                            className="bg-card border-border/60 focus:ring-primary/20"
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
                                        {sub.status === 'new' && <Button size="sm" className="h-8 text-[9px]" onClick={() => statusMutation.mutate({ id: sub.id, status: 'under_review' })}>{isRu ? 'В работу' : 'Start Review'}</Button>}
                                        {sub.status === 'under_review' && (
                                            <>
                                                <Button size="sm" variant="outline" className="h-8 text-[9px] text-status-accepted border-status-accepted/30 hover:bg-status-accepted/10" onClick={() => statusMutation.mutate({ id: sub.id, status: 'accepted' })}>{isRu ? 'Принять' : 'Accept'}</Button>
                                                <Button size="sm" variant="outline" className="h-8 text-[9px] text-status-revision border-status-revision/30 hover:bg-status-revision/10" onClick={() => setDecisionModal({ isOpen: true, subId: sub.id, target: 'revision_required' })}>{isRu ? 'Правки' : 'Revision'}</Button>
                                                <Button size="sm" variant="outline" className="h-8 text-[9px] text-status-rejected border-status-rejected/30 hover:bg-status-rejected/10" onClick={() => setDecisionModal({ isOpen: true, subId: sub.id, target: 'rejected' })}>{isRu ? 'Отклонить' : 'Reject'}</Button>
                                            </>
                                        )}
                                        {sub.status === 'accepted' && (
                                            publishingId === sub.id ? (
                                                <div className="flex items-center gap-2 animate-fade-in">
                                                    <select className="h-8 px-2 bg-muted border border-border/80 text-[9px] font-bold uppercase font-accent outline-none rounded-sm" value={selectedIssue} onChange={e => setSelectedIssue(e.target.value)}>
                                                        <option value="">{isRu ? 'Выпуск...' : 'Issue...'}</option>
                                                        {issues?.map((i: Issue) => <option key={i.id} value={i.id}>№{i.number} ({i.publication_date ? new Date(i.publication_date).getFullYear() : '—'})</option>)}
                                                    </select>
                                                    <Button size="icon" className="h-8 w-8" disabled={!selectedIssue} onClick={() => publishMutation.mutate({ subId: sub.id, issueId: selectedIssue })}><Send size={14}/></Button>
                                                    <button onClick={() => setPublishingId(null)} className="text-[10px] p-1 text-muted-foreground hover:text-foreground">✕</button>
                                                </div>
                                            ) : <Button size="sm" className="h-8 text-[9px]" onClick={() => setPublishingId(sub.id)}>{isRu ? 'Опубликовать' : 'Publish'}</Button>
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
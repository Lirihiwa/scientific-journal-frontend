import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { editorApi } from '../editor.api';
import { journalApi } from '../../journal/journal.api';
import type { SubmissionStatus } from '../../submission/submission.types';

export const useEditorDashboard = () => {
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

    const { data: allSubmissions, isLoading: isSubmissionsLoading } = useQuery({
        queryKey: ['editor-submissions', 'all'],
        queryFn: () => editorApi.getAllSubmissions()
    });

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

    return {
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
    };
};
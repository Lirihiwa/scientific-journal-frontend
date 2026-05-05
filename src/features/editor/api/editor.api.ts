// src/features/editor/api/editor.api.ts
import { apiClient } from '../../../shared/api/client';
import type { Submission, SubmissionStatus } from '../../../entities/submission/model/types';

export const editorApi = {
    // Получить все статьи в системе
    getAllSubmissions: async (status?: SubmissionStatus) => {
        const { data } = await apiClient.get<Submission[]>(`/submissions/${status ? `?status=${status}` : ''}`);
        return data;
    },

    // Изменение статуса с комментарием (Decision)
    updateStatus: async (id: string, status: SubmissionStatus, comment?: string) => {
        const { data } = await apiClient.patch<Submission>(`/submissions/${id}/status`, { status, comment });
        return data;
    },

    // Привязка статьи к выпуску (Публикация)
    publishToIssue: async (submissionId: string, issueId: string) => {
        // 1. Создаем запись в таблице публикаций
        await apiClient.post('/journal/publications', {
            submission_id: submissionId,
            issue_id: issueId,
            status: 'published'
        });
        // 2. Переводим статус рукописи в 'published'
        return editorApi.updateStatus(submissionId, 'published');
    }
};
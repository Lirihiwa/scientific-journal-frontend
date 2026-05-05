// src/features/editor/api/editor.api.ts
import { apiClient } from '../../../shared/api/client';
import type { Submission, SubmissionStatus } from '../../../entities/submission/model/types';
import type {CreatePublicationRequest} from "../model/types.ts";

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
    publishToIssue: async (payload: CreatePublicationRequest) => {
        // 1. Создаем запись в таблице публикаций
        await apiClient.post('/journal/publications', payload);
        // 2. Переводим статус рукописи в 'published'
        return editorApi.updateStatus(payload.submission_id, 'published');
    }
};
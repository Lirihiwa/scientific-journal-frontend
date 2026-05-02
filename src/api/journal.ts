// src/api/journal.ts
import api from './client';
import type { Volume, Issue, Publication, CurrentIssueResponse } from '../types/journal';

export const journalApi = {
    // Публичные методы
    getCurrentIssue: () => api.get<CurrentIssueResponse>('/journal/current-issue'),
    getVolumes: () => api.get<Volume[]>('/journal/volumes'),
    getIssuesByVolume: (volumeId: string) => api.get<Issue[]>(`/journal/issues?volume_id=${volumeId}`),
    getPublication: (id: string) => api.get<Publication>(`/journal/publications/${id}`),
    getIssuePublications: (issueId: string) => api.get<Publication[]>(`/journal/issues/${issueId}/publications`),

    // Ссылка на скачивание PDF
    getPdfUrl: (id: string) => `http://localhost:8088/api/journal/publications/${id}/pdf`,

    // Создание тома
    createVolume: (data: { year: number; number: number; title?: string; status: string }) =>
        api.post<Volume>('/journal/volumes', data),

    // Создание заявки
    createIssue: (data: { volume_id: string; number: number; title?: string; status: string; publication_date?: string }) =>
        api.post<Issue>('/journal/issues', data),

    // Самый важный метод: превращение рукописи в публикацию
    createPublication: (data: { submission_id: string; issue_id: string; status: string }) =>
        api.post<Publication>('/journal/publications', data),
};
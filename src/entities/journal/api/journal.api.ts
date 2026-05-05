// src/entities/journal/api/journal.api.ts
import { apiClient } from '../../../shared/api/client';
import type { Volume, Issue, Publication } from '../model/types';

export const journalApi = {
    getCurrentIssue: async () => {
        const { data } = await apiClient.get<{ issue: Issue; publications: Publication[] }>('/journal/current-issue');
        return data;
    },
    getVolumes: async () => {
        const { data } = await apiClient.get<Volume[]>('/journal/volumes');
        return data;
    },
    getIssues: async (volumeId: string) => {
        const { data } = await apiClient.get<Issue[]>(`/journal/issues?volume_id=${volumeId}`);
        return data;
    },
    getIssueDetails: async (id: string) => {
        const { data } = await apiClient.get<Issue>(`/journal/issues/${id}`);
        return data;
    },
    getIssuePublications: async (id: string) => {
        const { data } = await apiClient.get<Publication[]>(`/journal/issues/${id}/publications`);
        return data;
    },
    getPublication: async (id: string) => {
        const { data } = await apiClient.get<Publication>(`/journal/publications/${id}`);
        return data;
    },
    getPdfUrl: (id: string) => `${import.meta.env.VITE_API_URL}/journal/publications/${id}/pdf`,
};
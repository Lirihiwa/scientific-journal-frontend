import { apiClient } from '../../api/client';
import type { Volume, Issue, Publication } from './journal.types';
import type { CreateIssueRequest, CreateVolumeRequest } from '../editor/editor.types';

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
    getPdfUrl: (id: string) => `${import.meta.env.VITE_API_URL || 'http://localhost:8088/api'}/journal/publications/${id}/pdf`,
    createVolume: async (data: CreateVolumeRequest) => {
        const { data: volume } = await apiClient.post<Volume>('/journal/volumes', data);
        return volume;
    },
    createIssue: async (data: CreateIssueRequest) => {
        const { data: issue } = await apiClient.post<Issue>('/journal/issues', data);
        return issue;
    }
};
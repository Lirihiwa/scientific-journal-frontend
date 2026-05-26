import { apiClient } from '../../api/client';
import type { Submission, SubmissionStatus } from '../submission/submission.types';
import type { CreatePublicationRequest } from './editor.types';

export const editorApi = {
    getAllSubmissions: async (status?: SubmissionStatus) => {
        const { data } = await apiClient.get<Submission[]>(`/submissions/${status ? `?status=${status}` : ''}`);
        return data;
    },

    updateStatus: async (id: string, status: SubmissionStatus, comment?: string) => {
        const { data } = await apiClient.patch<Submission>(`/submissions/${id}/status`, { status, comment });
        return data;
    },

    publishToIssue: async (payload: CreatePublicationRequest) => {
        await apiClient.post('/journal/publications', payload);
        return editorApi.updateStatus(payload.submission_id, 'published');
    }
};
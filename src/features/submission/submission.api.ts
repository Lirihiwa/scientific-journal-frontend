import { apiClient } from '../../api/client';
import type { Submission, SubmissionDetails, SubmissionFormData } from './submission.types';

export const submissionApi = {
    getMySubmissions: async () => {
        const { data } = await apiClient.get<Submission[]>('/submissions/my');
        return data;
    },
    create: async (data: SubmissionFormData) => {
        const { data: submission } = await apiClient.post<Submission>('/submissions/', data);
        return submission;
    },
    uploadFile: async (id: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post(`/submissions/${id}/file`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateSubmission: async (id: string, data: Partial<SubmissionFormData>) => {
        const { data: updated } = await apiClient.put<Submission>(`/submissions/${id}`, data);
        return updated;
    },
    getById: async (id: string) => {
        const { data } = await apiClient.get<SubmissionDetails>(`/submissions/${id}`);
        return data;
    }
};
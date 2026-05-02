// src/api/submissions.ts
import api from './client';
import type {Submission, CreateSubmissionRequest, SubmissionDetails} from '../types/submissions';

export const submissionsApi = {
    // Получить мои статьи
    getMySubmissions: () => api.get<Submission[]>('/submissions/my'),

    // Создать черновик/заявку
    createSubmission: (data: CreateSubmissionRequest) =>
        api.post<Submission>('/submissions/', data),

    // Получить одну статью по ID
    getSubmission: (id: string) =>
        api.get<Submission>(`/submissions/${id}`),

    // Загрузить файл статьи
    uploadFile: (id: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/submissions/${id}/file`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Получить детали статьи
    getSubmissionDetails: (id: string) =>
        api.get<SubmissionDetails>(`/submissions/${id}`),
};
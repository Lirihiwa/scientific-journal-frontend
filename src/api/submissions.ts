// src/api/submissions.ts
import api from './client';
import type {Submission, CreateSubmissionRequest, SubmissionDetails, SubmissionStatus} from '../types/submissions';

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

    // Получить вообще все статьи (для редактора)
    getAllSubmissions: (status?: string) =>
        api.get<Submission[]>(`/submissions/${status ? `?status=${status}` : ''}`),

    // Смена статуса (с обязательным комментарием для некоторых переходов)
    patchStatus: (id: string, status: SubmissionStatus, comment?: string) =>
        api.patch<Submission>(`/submissions/${id}/status`, { status, comment }),
};
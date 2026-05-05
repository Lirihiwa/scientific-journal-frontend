// src/entities/submission/model/types.ts
import { z } from 'zod';

export const SubmissionStatusSchema = z.enum([
    'new', 'under_review', 'revision_required', 'accepted', 'rejected', 'published'
]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const CoAuthorSchema = z.object({
    full_name: z.string().min(2, 'Укажите ФИО'),
    organization: z.string().optional(),
    email: z.string().email('Некорректный email').optional().or(z.literal('')),
});

export type CoAuthor = z.infer<typeof CoAuthorSchema>;

export interface Submission {
    id: string;
    author_id: string;
    title_ru: string;
    title_en?: string;
    abstract_ru: string;
    abstract_en?: string;
    keywords_ru: string;
    status: SubmissionStatus;
    created_at: string;
    coauthors: CoAuthor[];
}

export type SubmissionEventType = 'created' | 'file_uploaded' | 'status_changed';

export interface SubmissionEvent {
    id: string;
    submission_id: string;
    actor_id?: string;
    actor_role?: string;
    event_type: SubmissionEventType;
    from_status?: SubmissionStatus;
    to_status?: SubmissionStatus;
    comment?: string;
    payload: Record<string, any>;
    created_at: string;
}

export interface SubmissionDetails extends Submission {
    events: SubmissionEvent[];
    author_email: string;
    manuscript_language: 'ru' | 'en';
    current_version: number;
    submitted_file_name?: string;
    submitted_file_size_bytes?: number;
}
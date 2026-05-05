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
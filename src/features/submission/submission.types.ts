import { z } from 'zod';

export const SubmissionStatusSchema = z.enum([
    'new', 'under_review', 'revision_required', 'accepted', 'rejected', 'published'
]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const CoAuthorSchema = z.object({
    full_name: z.string().min(2, 'Укажите ФИО'),
    organization: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    email: z.string().email('Некорректный email').optional().or(z.literal('')),
});

export type CoAuthor = z.infer<typeof CoAuthorSchema>;

export interface Submission {
    id: string;
    author_id: string;
    manuscript_language: 'ru' | 'en';
    title_ru: string;
    title_en?: string | null;
    abstract_ru: string;
    abstract_en?: string | null;
    keywords_ru: string;
    keywords_en?: string | null;
    coauthors: CoAuthor[];
    cover_letter?: string | null;
    funding_info_ru?: string | null;
    funding_info_en?: string | null;
    policy_accepted: boolean;
    current_version: number;
    submitted_file_object_key?: string | null;
    submitted_file_name?: string | null;
    submitted_file_mime_type?: string | null;
    submitted_file_size_bytes?: number;
    status: SubmissionStatus;
    created_at: string;
    updated_at: string;
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
    payload: Record<string, unknown>;
    created_at: string;
}

export interface SubmissionDetails extends Submission {
    events: SubmissionEvent[];
    author_email: string;
}

// Аннотация ограничена 300 символами (с пробелами), считается по обоим языкам
export const ABSTRACT_MAX_LENGTH = 300;

export const submissionFormSchema = z.object({
    manuscript_language: z.enum(['ru', 'en']),
    title_ru: z.string().min(5, 'Заголовок слишком короткий').max(500, 'Заголовок слишком длинный'),
    title_en: z.string().min(5, 'Заголовок слишком короткий (мин. 5 символов)').max(500, 'Заголовок слишком длинный'),
    abstract_ru: z.string().min(10, 'Аннотация должна быть не менее 10 символов').max(ABSTRACT_MAX_LENGTH, `Аннотация не должна превышать ${ABSTRACT_MAX_LENGTH} символов`),
    abstract_en: z.string().min(10, 'Аннотация должна быть не менее 10 символов').max(ABSTRACT_MAX_LENGTH, `Аннотация не должна превышать ${ABSTRACT_MAX_LENGTH} символов`),
    keywords_ru: z.string().min(3, 'Укажите ключевые слова'),
    keywords_en: z.string().min(3, 'Укажите ключевые слова (EN)'),
    coauthors: z.array(CoAuthorSchema),
    cover_letter: z.string().optional().nullable(),
    funding_info_ru: z.string().optional().nullable(),
    funding_info_en: z.string().optional().nullable(),
    policy_accepted: z.boolean().refine(val => val === true, 'Необходимо принять условия'),
    data_processing_accepted: z.boolean().refine(val => val === true, 'Необходимо дать согласие на обработку персональных данных'),
});

export type SubmissionFormData = z.infer<typeof submissionFormSchema>;
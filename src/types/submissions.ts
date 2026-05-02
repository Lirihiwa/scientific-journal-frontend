// src/types/submissions.ts

export type SubmissionStatus =
    | 'new'
    | 'under_review'
    | 'revision_required'
    | 'accepted'
    | 'rejected'
    | 'published';

export interface CoAuthor {
    full_name: string;
    organization?: string;
    country?: string;
    email?: string;
}

export interface Submission {
    id: string;
    author_id: string;
    manuscript_language: 'ru' | 'en';
    title_ru: string;
    title_en?: string;
    abstract_ru: string;
    abstract_en?: string;
    keywords_ru: string;
    keywords_en?: string;
    coauthors: CoAuthor[];
    cover_letter?: string;
    funding_info_ru?: string;
    funding_info_en?: string;
    policy_accepted: boolean;
    current_version: number;
    submitted_file_name?: string;
    status: SubmissionStatus;
    created_at: string;
    updated_at: string;
}

export interface CreateSubmissionRequest {
    manuscript_language: 'ru' | 'en';
    title_ru: string;
    title_en?: string;
    abstract_ru: string;
    abstract_en?: string;
    keywords_ru: string;
    keywords_en?: string;
    coauthors: CoAuthor[];
    cover_letter?: string;
    policy_accepted: boolean;
}

export interface SubmissionEvent {
    id: string;
    submission_id: string;
    actor_id?: string;
    actor_role?: string;
    event_type: 'created' | 'file_uploaded' | 'status_changed';
    from_status?: SubmissionStatus;
    to_status?: SubmissionStatus;
    comment?: string;
    payload: any;
    created_at: string;
}

export interface SubmissionDetails extends Submission {
    events: SubmissionEvent[];
}
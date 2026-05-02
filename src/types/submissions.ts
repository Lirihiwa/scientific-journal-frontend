export type SubmissionStatus = 'new' | 'under_review' | 'revision_required' | 'accepted' | 'rejected' | 'published';

export interface Submission {
    id: string;
    author_id: string;
    title_ru: string;
    title_en?: string;
    abstract_ru: string;
    abstract_en?: string;
    status: SubmissionStatus;
    created_at: string;
    submitted_file_name?: string;
}
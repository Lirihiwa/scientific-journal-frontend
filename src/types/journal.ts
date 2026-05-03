// src/types/journal.ts

export type VolumeStatus = 'draft' | 'open' | 'published' | 'archived';
export type IssueStatus = 'draft' | 'open' | 'published' | 'archived';
export type PublicationStatus = 'scheduled' | 'published' | 'withdrawn';

export interface Volume {
    id: string;
    year: number;
    number: number;
    title?: string;
    description?: string;
    status: VolumeStatus;
}

export interface Issue {
    id: string;
    volume_id: string;
    number: number;
    title?: string;
    description?: string;
    publication_date?: string;
    status: IssueStatus;
}

export interface Publication {
    id: string;
    submission_id: string;
    issue_id: string;
    title_ru: string;
    title_en?: string;
    abstract_ru: string;
    abstract_en?: string;
    keywords_ru: string;
    keywords_en?: string;
    authors: { author_id: string; is_primary: boolean; full_name?: string }[];
    doi?: string;
    pdf_file_name?: string;
    pdf_download_enabled: boolean;
    pdf_download_allowed: boolean; // Вычисляемое поле на бэкенде (с учетом эмбарго)
    embargo_until?: string;
    published_at?: string;
}

export interface CurrentIssueResponse {
    issue: Issue;
    publications: Publication[];
}

export interface CreateVolumeRequest {
    year: number;
    number: number;
    title?: string;
    description?: string;
    status: VolumeStatus;
}

export interface CreateIssueRequest {
    volume_id: string;
    number: number;
    title?: string;
    description?: string;
    publication_date?: string;
    status: IssueStatus;
}

export interface CreatePublicationRequest {
    submission_id: string;
    issue_id: string;
    doi?: string;
    status: PublicationStatus;
}
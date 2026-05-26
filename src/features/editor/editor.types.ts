import type { VolumeStatus, IssueStatus } from '../journal/journal.types';

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
    status: 'scheduled' | 'published';
}
import { z } from 'zod';

export type VolumeStatus = 'draft' | 'open' | 'published' | 'archived';
export type IssueStatus = 'draft' | 'open' | 'published' | 'archived';
export type PublicationStatus = 'scheduled' | 'published' | 'withdrawn';

export const PublicationAuthorSchema = z.object({
    author_id: z.string().uuid().nullable().optional(),
    is_primary: z.boolean(),
});

export const PublicationSchema = z.object({
    id: z.string().uuid(),
    submission_id: z.string().uuid(),
    issue_id: z.string().uuid(),
    title_ru: z.string(),
    title_en: z.string().optional().nullable(),
    abstract_ru: z.string(),
    abstract_en: z.string().optional().nullable(),
    keywords_ru: z.string(),
    keywords_en: z.string().optional().nullable(),
    authors: z.array(PublicationAuthorSchema),
    doi: z.string().optional().nullable(),
    pdf_object_key: z.string().optional().nullable(),
    pdf_file_name: z.string().optional().nullable(),
    pdf_file_size_bytes: z.number().optional().nullable(),
    pdf_download_enabled: z.boolean(),
    pdf_download_allowed: z.boolean(),
    embargo_until: z.string().optional().nullable(),
    status: z.custom<PublicationStatus>(),
    published_at: z.string().optional().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Publication = z.infer<typeof PublicationSchema>;

export interface Volume {
    id: string;
    year: number;
    number: number;
    title?: string;
    description?: string;
    status: VolumeStatus;
    created_at: string;
}

export interface Issue {
    id: string;
    volume_id: string;
    number: number;
    title?: string;
    description?: string;
    publication_date: string;
    status: IssueStatus;
}
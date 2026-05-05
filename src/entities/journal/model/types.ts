// src/entities/journal/model/types.ts
import { z } from 'zod';

export const PublicationAuthorSchema = z.object({
    author_id: z.string().uuid(),
    full_name: z.string(),
    is_primary: z.boolean(),
});

export const PublicationSchema = z.object({
    id: z.string().uuid(),
    title_ru: z.string(),
    title_en: z.string().optional().nullable(),
    abstract_ru: z.string(),
    abstract_en: z.string().optional().nullable(),
    keywords_ru: z.string(),
    keywords_en: z.string().optional().nullable(),
    authors: z.array(PublicationAuthorSchema),
    doi: z.string().optional().nullable(),
    pdf_download_allowed: z.boolean(),
    published_at: z.string(),
});

export type Publication = z.infer<typeof PublicationSchema>;

export interface Issue {
    id: string;
    number: number;
    volume_id: string;
    publication_date: string;
    description?: string;
}

export interface Volume {
    id: string;
    year: number;
    number: number;
    title?: string;
}
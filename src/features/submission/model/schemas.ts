// src/features/submissions/model/schemas.ts
import { z } from 'zod';
import { CoAuthorSchema } from '../../../entities/submission/model/types';

export const submissionFormSchema = z.object({
    manuscript_language: z.enum(['ru', 'en']),
    title_ru: z.string().min(5, 'Заголовок слишком короткий').max(500, 'Заголовок слишком длинный'),
    title_en: z.string().max(500).optional().nullable(),
    abstract_ru: z.string().min(50, 'Аннотация должна быть не менее 50 символов'),
    abstract_en: z.string().optional().nullable(),
    keywords_ru: z.string().min(3, 'Укажите ключевые слова'),
    keywords_en: z.string().optional().nullable(),
    coauthors: z.array(CoAuthorSchema),
    cover_letter: z.string().optional().nullable(),
    funding_info_ru: z.string().optional().nullable(),
    funding_info_en: z.string().optional().nullable(),
    policy_accepted: z.boolean().refine(val => val === true, 'Необходимо принять условия'),
});

export type SubmissionFormData = z.infer<typeof submissionFormSchema>;
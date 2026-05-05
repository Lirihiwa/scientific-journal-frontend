// src/features/submissions/model/schemas.ts
import { z } from 'zod';
import { CoAuthorSchema } from '../../../entities/submission/model/types';

export const submissionFormSchema = z.object({
    title_ru: z.string().min(5, 'Заголовок слишком короткий'),
    title_en: z.string().optional(),
    abstract_ru: z.string().min(50, 'Аннотация должна быть не менее 50 символов'),
    abstract_en: z.string().optional(),
    keywords_ru: z.string().min(3, 'Укажите ключевые слова'),
    keywords_en: z.string().optional(), // ← Добавили это поле
    manuscript_language: z.enum(['ru', 'en']),
    coauthors: z.array(CoAuthorSchema),
    policy_accepted: z.boolean().refine(val => val === true, 'Необходимо принять условия'),
});

export type SubmissionFormData = z.infer<typeof submissionFormSchema>;
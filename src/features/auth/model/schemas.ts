// src/features/auth/model/schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Обязательное поле').email('Введите корректный email'),
    password: z.string().min(8, 'Минимальная длина пароля — 8 символов'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.string().min(1, 'Обязательное поле').email('Введите корректный email'),
    password: z.string().min(8, 'Минимальная длина пароля — 8 символов'),
    first_name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    last_name: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
    middle_name: z.string().optional(),
    country: z.string().optional(),
    organization: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
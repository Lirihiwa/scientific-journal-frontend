import { z } from 'zod';

export const RoleCodeSchema = z.enum(['author', 'reviewer', 'editor', 'admin']);
export type RoleCode = z.infer<typeof RoleCodeSchema>;

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    middle_name: z.string().nullable().optional(),
    organization: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    role_code: RoleCodeSchema,
    is_active: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export interface AuthResult {
    user: User;
    tokens: {
        access_token: string;
        refresh_token: string;
        token_type: string;
    };
}

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
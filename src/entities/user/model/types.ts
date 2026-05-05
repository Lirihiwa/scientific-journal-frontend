import { z } from 'zod';

// Zod-схема позволяет нам не только иметь TS типы, но и валидировать ответы/формы
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
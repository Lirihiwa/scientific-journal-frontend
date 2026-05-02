export type RoleCode = 'author' | 'reviewer' | 'editor' | 'admin';

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    organization?: string;
    country?: string;
    role_code: RoleCode;
    is_active: boolean;
}

export interface AuthResult {
    user: User;
    tokens: {
        access_token: string;
        refresh_token: string;
        token_type: string;
    };
}
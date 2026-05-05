export interface ApiError {
    detail: string | Array<{ msg: string; loc: string[] }>;
}

export interface TokenPair {
    access_token: string;
    refresh_token: string;
    token_type: string;
}
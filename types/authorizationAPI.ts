export interface AuthorizationAPI {
    token: string;
    rank: number;
    userId: string;
}

export interface Token {
    userId: string;
    rank: number;
    iat: number;
    exp: number;
}

export interface LoginAPI {
    login: string;
    password: string;
}
export enum UserRoles {
    CREATOR = 'creator',
    CUSTOMER = 'customer'
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    accessToken: string;
    accountType: UserRoles.CREATOR | UserRoles.CUSTOMER;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    accountType: UserRoles.CREATOR | UserRoles.CUSTOMER;
}

export interface UserResponse {
    name: string;
    email: string;
    accountType: UserRoles.CREATOR | UserRoles.CUSTOMER;
    avatarId: string;
    description: string;
}

export interface UpdateUserRequest {
    name: string;
    description: string;
    email: string;
    avatarId: string;
}

export const USERS_ENDPOINT = '/users';
export const LOGIN_ENDPOINT = '/login';
export const REGISTER_ENDPOINT = '/register';
export const LOGOUT_ENDPOINT = '/logout';
export const REFRESH_TOKEN_ENDPOINT = '/refresh';

enum UserRoles {
    CREATOR = 'creator',
    CUSTOMER = 'customer',
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    accessToken: string;
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
    avatarUrl: string;
    description: string;
}

export interface UpdateUserRequest {
    id: string | null;
    name: string;
    description: string;
    email: string;
    accountType: UserRoles.CREATOR | UserRoles.CUSTOMER;
    avatarUrl: string;
}

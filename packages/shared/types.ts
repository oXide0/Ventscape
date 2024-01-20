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
    accountType: 'customer' | 'creator';
}

export interface UserResponse {
    name: string;
    email: string;
    accountType: 'customer' | 'creator';
    avatarUrl: string;
    description: string;
}

export interface UpdateUserRequest {
    id: string | null;
    name: string;
    description: string;
    email: string;
    accountType: 'customer' | 'creator';
    avatarUrl: string;
}

export interface IEvent {
    id: string;
    title: string;
    description: string;
    mode: string;
    category: string;
    date: string;
    street: string;
    city: string;
    country: string;
    link: string;
    price: number;
    creatorId: string;
    img: string;
}

export interface CreateEventRequest {
    title: string;
    description: string;
    mode: string;
    category: string;
    date: string;
    street: string;
    city: string;
    country: string;
    link: string;
    price: number;
    creatorId: string;
    img: string;
}

export interface UpdateEventRequest {
    id: string;
    title: string;
    description: string;
    mode: string;
    category: string;
    date: string;
    street: string;
    city: string;
    country: string;
    link: string;
    price: number;
    creatorId: string;
    img: string;
}

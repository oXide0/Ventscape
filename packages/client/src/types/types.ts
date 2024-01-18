export interface IUser {
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

export interface EventsFilter {
    datePosted: 'any' | 'this-week' | 'this-month' | 'this-year';
    country: string;
    mode: 'all' | 'online' | 'offline';
    category: string;
    price: 'all' | 'free' | 'paid';
}

export interface ImageValues {
    file: File | null;
    url: string | null | undefined;
}

export interface Message {
    author: string;
    content: string;
}

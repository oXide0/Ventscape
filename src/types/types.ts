export interface User {
    name: string;
    password: string;
    about: string;
    email: string;
    accountType: 'customer' | 'creator';
    subscriptions: string[];
    followers?: string[];
    notifications: string[];
}

export interface Event {
    id: string;
    name: string;
    about: string;
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

export interface EventImageValues {
    file: File | null;
    url: string | null | undefined;
}

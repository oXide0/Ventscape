export interface Event {
    id: string;
    title: string;
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

export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    description: string;
    accountType: 'customer' | 'creator';
    subscriptions: string[];
    followers?: string[];
    notifications: string[];
}

export interface EventsFilter {
    datePosted: 'any' | 'this-week' | 'this-month' | 'this-year';
    country: string;
    mode: 'all' | 'online' | 'offline';
    category: string;
    price: 'all' | 'free' | 'paid';
}

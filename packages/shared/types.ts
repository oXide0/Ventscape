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

export interface User {
    name: string;
    password: string;
    email: string;
    description: string;
    accountType: 'customer' | 'creator';
    subscriptions: string[];
    followers?: string[];
    notifications: string[];
}

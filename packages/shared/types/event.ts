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
    imgId: string;
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
    imgId: string;
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
    imgId: string;
}

export const EVENTS_ENDPOINT = '/events';

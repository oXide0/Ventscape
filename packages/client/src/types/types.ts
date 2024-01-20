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

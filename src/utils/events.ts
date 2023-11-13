import { Event, EventsFilter } from 'types/types';

export const eventCategories = [
    'Arts and Culture',
    'Business and Professional',
    'Educational',
    'Entertainment and Media',
    'Food and Drink',
    'Health and Wellness',
    'Hobbies and Special Interest',
    'Science and Technology',
    'Social and Lifestyle',
    'Sports and Adventure',
    'Charity and Causes',
    'Government and Politics',
    'Religious and Spiritual',
    'Family and Kids',
    'Holiday and Seasonal',
].sort();

export const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'New Zealand',
    'Ireland',
    'Ukraine',
    'Slovakia',
    'Czech Republic',
    'Poland',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Portugal',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria',
    'Denmark',
    'Sweden',
    'Norway',
    'Finland',
].sort();

export const filterEventData = (event: Event) => {
    if (event.mode === 'online') {
        return {
            name: event.name,
            about: event.about,
            mode: event.mode,
            category: event.category,
            date: event.date,
            link: event.link,
            price: event.price ? event.price : 0,
        };
    }
    return {
        name: event.name,
        about: event.about,
        mode: event.mode,
        category: event.category,
        date: event.date,
        street: event.street,
        city: event.city,
        country: event.country,
        link: event.link,
        price: event.price ? event.price : 0,
    };
};

export const convertDateFormat = (dateStr: string): string => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const filterEvents = (events: Event[], filter: EventsFilter): Event[] => {
    return events.filter((event) => {
        const dateMatch = checkDate(event.date, filter.datePosted);
        const countryMatch = filter.country === 'all' || event.country === filter.country;
        const modeMatch = filter.mode === 'all' || event.mode === filter.mode;
        const categoryMatch = filter.category === 'all' || event.category === filter.category;
        const priceMatch = checkPrice(event.price, filter.price);

        return dateMatch && countryMatch && modeMatch && categoryMatch && priceMatch;
    });
};

function checkDate(
    eventDate: string,
    filterDate: 'any' | 'this-week' | 'this-month' | 'this-year'
): boolean {
    if (filterDate === 'any') {
        return true;
    }

    const eventDateTime = new Date(eventDate).getTime();
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    switch (filterDate) {
        case 'this-week':
            return eventDateTime >= startOfWeek.getTime();
        case 'this-month':
            return eventDateTime >= startOfMonth.getTime();
        case 'this-year':
            return eventDateTime >= startOfYear.getTime();
        default:
            return false;
    }
}

function checkPrice(eventPrice: number, filterPrice: 'all' | 'free' | 'paid'): boolean {
    switch (filterPrice) {
        case 'all':
            return true;
        case 'free':
            return eventPrice === 0;
        case 'paid':
            return eventPrice > 0;
        default:
            return false;
    }
}

import { IEvent, EventsFilter } from 'types/types';

export const eventCategories = [
    { label: 'Arts and Culture', value: 'Arts and Culture' },
    { label: 'Business and Professional', value: 'Business and Professional' },
    { label: 'Educational', value: 'Educational' },
    { label: 'Entertainment and Media', value: 'Entertainment and Media' },
    { label: 'Food and Drink', value: 'Food and Drink' },
    { label: 'Health and Wellness', value: 'Health and Wellness' },
    { label: 'Hobbies and Special Interest', value: 'Hobbies and Special Interest' },
    { label: 'Science and Technology', value: 'Science and Technology' },
    { label: 'Social and Lifestyle', value: 'Social and Lifestyle' },
    { label: 'Sports and Adventure', value: 'Sports and Adventure' },
    { label: 'Charity and Causes', value: 'Charity and Causes' },
    { label: 'Government and Politics', value: 'Government and Politics' },
    { label: 'Religious and Spiritual', value: 'Religious and Spiritual' },
    { label: 'Family and Kids', value: 'Family and Kids' },
    { label: 'Holiday and Seasonal', value: 'Holiday and Seasonal' },
].sort((a, b) => a.label.localeCompare(b.label));

export const countries = [
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Australia', value: 'Australia' },
    { label: 'New Zealand', value: 'New Zealand' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'Ukraine', value: 'Ukraine' },
    { label: 'Slovakia', value: 'Slovakia' },
    { label: 'Czech Republic', value: 'Czech Republic' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Germany', value: 'Germany' },
    { label: 'France', value: 'France' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Austria', value: 'Austria' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Sweden', value: 'Sweden' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Finland', value: 'Finland' },
].sort((a, b) => a.label.localeCompare(b.label));

export const filterEventData = (event: IEvent) => {
    if (event.mode === 'online') {
        return {
            name: event.title,
            about: event.description,
            mode: event.mode,
            category: event.category,
            date: event.date,
            link: event.link,
            price: event.price ? event.price : 0,
        };
    }
    return {
        name: event.title,
        about: event.description,
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

export const filterEvents = (events: IEvent[], filter: EventsFilter): IEvent[] => {
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

export const truncateDescription = (description: string): string => {
    const maxLength = 100;
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;
};

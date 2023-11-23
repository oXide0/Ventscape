import { describe, expect, it } from 'vitest';
import EventCard from 'components/EventCard';
import { render, screen } from '@testing-library/react';
import { Event } from 'types/types';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { BrowserRouter } from 'react-router-dom';

describe('EventCard', () => {
    it('should render', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <EventCard {...mockEvent} />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(mockEvent.name)).toBeTruthy();
    });
});

const mockEvent: Event = {
    id: '1',
    name: 'Tech Expo 2023',
    about: 'Explore the latest in technology and innovation at Tech Expo 2023. Engage with cutting-edge products, attend informative sessions, and network with industry leaders.',
    mode: 'In-person',
    category: 'Technology',
    date: '2023-12-15',
    street: '123 Innovation Avenue',
    city: 'Tech City',
    country: 'Innovationland',
    link: 'https://techexpo2023.com',
    price: 25.99,
    creatorId: 'organizer123',
    img: 'https://example.com/tech-expo-image.jpg',
};

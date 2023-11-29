import { render } from '@testing-library/react';
import EventCard from 'components/EventCard';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store/store';
import { Event } from 'types/types';

describe('EventCard', () => {
    it('should render', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EventCard {...mockEvent} />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText('Tech Expo 2023')).toBeInTheDocument();
        expect(
            getByText(
                'Explore the latest in technology and innovation at Tech Expo 2023. Engage with cutting-edge products, attend informative sessions, and network with industry leaders.'
            )
        ).toBeInTheDocument();
        expect(getByText('Tech City')).toBeInTheDocument();
    });
});

const mockEvent: Event = {
    id: '1',
    name: 'Tech Expo 2023',
    about: 'Explore the latest in technology and innovation at Tech Expo 2023. Engage with cutting-edge products, attend informative sessions, and network with industry leaders.',
    mode: 'offline',
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

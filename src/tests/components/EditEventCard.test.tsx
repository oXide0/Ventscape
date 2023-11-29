import { fireEvent, render } from '@testing-library/react';
import EditEventCard from 'components/EditEventCard';
import { Event } from 'types/types';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { MemoryRouter } from 'react-router-dom';
import { convertDateFormat } from 'utils/events';

describe('EditEventCard', () => {
    it('should render', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditEventCard onRemoveEvent={() => {}} {...mockEvent} />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText('Tech Expo 2023')).toBeInTheDocument();
        expect(getByText(convertDateFormat('2023-12-15'))).toBeInTheDocument();
    });

    it('does not show actions when showActions is false', () => {
        const { queryByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditEventCard onRemoveEvent={() => {}} showActions={false} {...mockEvent} />
                </MemoryRouter>
            </Provider>
        );

        expect(queryByText('Edit')).toBeNull();
        expect(queryByText('Remove')).toBeNull();
    });

    it('triggers remove event functionality', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditEventCard onRemoveEvent={() => {}} {...mockEvent} />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Remove')).toBeInTheDocument();
        fireEvent.click(getByText('Remove'));
        expect(getByText('Delete Event')).toBeInTheDocument();
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

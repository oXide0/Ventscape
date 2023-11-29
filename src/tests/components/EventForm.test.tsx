import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from 'components/EventForm';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store/store';
import { Event } from 'types/types';
import { vi } from 'vitest';

const mockSubmit = vi.fn();
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

describe('EventForm', () => {
    it('should render', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EventForm submit={mockSubmit} />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText('Event Name')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Date and Time')).toBeInTheDocument();
        expect(getByText('Event Category')).toBeInTheDocument();
        expect(getByText('Online/Offline')).toBeInTheDocument();
        expect(getByText('Link to event')).toBeInTheDocument();
        expect(getByText('Paid event?')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    it('renders form and triggers submit function', async () => {
        const { getByLabelText, getByRole } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <EventForm eventData={mockEvent} submit={mockSubmit} />
                </MemoryRouter>
            </Provider>
        );

        // Fill out the form fields
        userEvent.type(getByLabelText(/Event Name/i), mockEvent.name);
        userEvent.type(getByLabelText(/Description/i), mockEvent.about);
        userEvent.type(getByLabelText(/Date and Time/i), mockEvent.date);
        userEvent.selectOptions(getByLabelText(/Online\/Offline/i), mockEvent.mode);

        if (mockEvent.mode === 'offline') {
            userEvent.type(getByLabelText(/City/i), mockEvent.city);
            userEvent.type(getByLabelText(/Street Address/i), mockEvent.street);
        }

        userEvent.type(getByLabelText(/Link to event/i), mockEvent.link);

        const switchElement = getByLabelText(/Paid event/i);
        fireEvent.click(switchElement);
        fireEvent.click(getByRole('button', { name: /Submit/i }));
    });
});

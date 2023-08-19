import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import EventCard from './EventCard';

describe('EventCard component', () => {
	const defaultProps = {
		id: 'event123',
		isLiked: false,
		mode: 'Offline',
		category: 'Workshop',
		city: 'Sample City',
		country: 'Sample Country',
		price: 10,
		currency: 'USD',
		date: '2023-08-18T14:00',
		name: 'Sample Event',
		about: 'This is a sample event description.',
	};

	it('should render EventCard component', () => {
		const { getByText, getByAltText, getByTestId } = render(
			<Provider store={store}>
				<BrowserRouter>
					<EventCard variant='default' {...defaultProps} />
				</BrowserRouter>
			</Provider>
		);

		expect(getByAltText(defaultProps.category)).toBeInTheDocument();
		expect(getByText(`${defaultProps.city}, ${defaultProps.country}`)).toBeInTheDocument();
		expect(getByText('Sample Event')).toBeInTheDocument();
		expect(getByText('This is a sample event description.')).toBeInTheDocument();
		expect(getByText('10 USD')).toBeInTheDocument();
		expect(getByText('August 18, 2023 at 2:00 PM')).toBeInTheDocument();
		expect(getByTestId('like-button')).toBeInTheDocument();
		expect(getByText('#Workshop')).toBeInTheDocument();
		expect(getByText('Learn More')).toBeInTheDocument();
	});
});

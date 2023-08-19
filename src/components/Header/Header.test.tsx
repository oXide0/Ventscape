import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Header from './Header';
import { vi } from 'vitest';

vi.mock('../../hooks/useAuth', () => ({
	useAuth: () => ({
		isAuth: true,
		userData: { name: 'John Doe' },
	}),
}));

describe('Header component', () => {
	it('renders the header with appropriate elements for authenticated user', () => {
		const { getByText, getByPlaceholderText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(getByPlaceholderText('Search...')).toBeInTheDocument();
		expect(getByText('John Doe')).toBeInTheDocument();
	});
});

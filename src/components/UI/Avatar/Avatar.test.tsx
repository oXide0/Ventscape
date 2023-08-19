import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('Avatar component', () => {
	it('renders avatar with icon', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Avatar />
				</BrowserRouter>
			</Provider>
		);
		const icon = screen.getByTestId('icon');
		expect(icon).toBeInTheDocument();
	});
});

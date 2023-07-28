import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('Avatar', () => {
	it('renders avatar with icon', () => {
		render(
			<Provider store={store}>
				<Avatar />
			</Provider>,
			{ wrapper: BrowserRouter }
		);
		const icon = screen.getByTestId('icon');
		expect(icon).toBeInTheDocument();
	});
});

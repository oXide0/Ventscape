import { render, screen } from '@testing-library/react';
import CustomLink from './CustomLink';
import { BrowserRouter } from 'react-router-dom';

describe('CustomLink', () => {
	test('renders CustomLink component', () => {
		render(
			<BrowserRouter>
				<CustomLink to='/' name='home'>
					Home
				</CustomLink>
			</BrowserRouter>
		);
		const linkElement = screen.getByText(/Home/i);
		expect(linkElement).toBeInTheDocument();
	});
});

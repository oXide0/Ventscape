import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import MenuItem from './MenuItem';
import { vi } from 'vitest';

describe('MenuItem Component', () => {
	it('renders a link correctly', () => {
		const { getByText } = render(
			<BrowserRouter>
				<Menu>
					<MenuItem variant='link' path='/some-path'>
						Test Link
					</MenuItem>
				</Menu>
			</BrowserRouter>
		);
		expect(getByText('Test Link')).toHaveAttribute('href', '/some-path');
	});

	it('renders a button correctly', () => {
		const { getByText } = render(
			<Menu>
				<MenuItem variant='button'>Test Button</MenuItem>
			</Menu>
		);
		expect(getByText('Test Button')).toBeInTheDocument();
	});

	it('calls onClick for button variant', () => {
		const mockOnClick = vi.fn();
		const { getByText } = render(
			<Menu>
				<MenuItem variant='button' onClick={mockOnClick}>
					Test Button
				</MenuItem>
			</Menu>
		);
		const button = getByText('Test Button');
		fireEvent.click(button);
		expect(mockOnClick).toHaveBeenCalled();
	});

	it('does not add active class for inactive link', () => {
		const { getByText } = render(
			<BrowserRouter>
				<Menu>
					<MenuItem variant='link' path='/some-other-path'>
						Test Link
					</MenuItem>
				</Menu>
			</BrowserRouter>
		);
		const link = getByText('Test Link');
		expect(link).not.toHaveClass('bg-gray-500');
	});
});

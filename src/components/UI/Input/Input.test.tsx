import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
	test('renders Input component', () => {
		render(
			<Input
				label='label'
				placeholder='placeholder'
				id='id'
				autoComplete='autoComplete'
				register='register'
				errors='errors'
			/>
		);
		const inputElement = screen.getByPlaceholderText(/placeholder/i);
		expect(inputElement).toBeInTheDocument();
	});
});

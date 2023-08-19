import { render, fireEvent } from '@testing-library/react';
import Input from './Input';
import { vi } from 'vitest';

describe('Input Component', () => {
	const mockRegister = vi.fn();

	it('renders label correctly', () => {
		const { getByText } = render(<Input label='Test Label' id='testId' register={mockRegister} errors={{}} />);
		expect(getByText('Test Label')).toBeInTheDocument();
	});

	it('renders error message when errors are present', () => {
		const { getByText } = render(
			<Input
				label='Test Label'
				id='testId'
				register={mockRegister}
				errors={{ testId: { message: 'Error message' } }}
			/>
		);
		expect(getByText('Error message')).toBeInTheDocument();
	});

	it('displays typed value', () => {
		const { getByLabelText } = render(<Input label='Test Label' id='testId' register={mockRegister} errors={{}} />);
		const input = getByLabelText('Test Label');
		fireEvent.change(input, { target: { value: 'Hello' } });
		expect(input).toHaveValue('Hello');
	});
});

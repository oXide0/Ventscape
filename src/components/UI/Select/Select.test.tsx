import { render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
	test('renders Select component', () => {
		render(<Select label='label' id='id' register='register' options={['option1', 'option2']} />);
		const selectElement = screen.getByLabelText(/label/i);
		expect(selectElement).toBeInTheDocument();
	});
});

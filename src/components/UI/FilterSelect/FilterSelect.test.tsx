import { render } from '@testing-library/react';
import FilterSelect from './FilterSelect';
import { vi } from 'vitest';

describe('FilterSelect component', () => {
	const defaultProps = {
		title: 'Select Option',
		options: ['Option1', 'Option2', 'Option3'],
		register: vi.fn(),
	};

	it('renders the component with provided options', () => {
		const { getByTestId, getByText } = render(<FilterSelect {...defaultProps} />);

		expect(getByTestId('Select Option')).toBeInTheDocument();
		expect(getByText('Option1')).toBeInTheDocument();
		expect(getByText('Option2')).toBeInTheDocument();
		expect(getByText('Option3')).toBeInTheDocument();
	});
});

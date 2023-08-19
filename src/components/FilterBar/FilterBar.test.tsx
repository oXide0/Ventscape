import { render } from '@testing-library/react';
import FiltersBar from './FiltersBar';
import { vi } from 'vitest';

describe('FiltersBar component', () => {
	const mockSetFilter = vi.fn();
	it('renders the component with filter options', () => {
		const { getByTestId } = render(<FiltersBar setFilter={mockSetFilter} />);

		expect(getByTestId('Date posted')).toBeInTheDocument();
		expect(getByTestId('Country')).toBeInTheDocument();
		expect(getByTestId('Type')).toBeInTheDocument();
		expect(getByTestId('Event Category')).toBeInTheDocument();
		expect(getByTestId('Price')).toBeInTheDocument();
	});
});

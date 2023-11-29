import { render } from '@testing-library/react';
import FiltersBar from 'components/FiltersBar';
import { TestWrapper } from 'utils/tests';
import { vi } from 'vitest';

const mockOnFilter = vi.fn((filterData) => filterData);

describe('FiltersBar', () => {
    it('renders form and triggers onFilter function', () => {
        const { getByLabelText } = render(
            <TestWrapper>
                <FiltersBar onFilter={mockOnFilter} />
            </TestWrapper>
        );

        expect(getByLabelText('Date posted')).toBeInTheDocument();
        expect(getByLabelText('Country')).toBeInTheDocument();
        expect(getByLabelText('Type')).toBeInTheDocument();
        expect(getByLabelText('Event Category')).toBeInTheDocument();
        expect(getByLabelText('Price')).toBeInTheDocument();
    });
});

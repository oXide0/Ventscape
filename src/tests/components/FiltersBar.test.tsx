import { render } from '@testing-library/react';
import FiltersBar from 'components/FiltersBar';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store/store';
import { vi } from 'vitest';

const mockOnFilter = vi.fn((filterData) => filterData);

describe('FiltersBar', () => {
    it('renders form and triggers onFilter function', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <FiltersBar onFilter={mockOnFilter} />
                </MemoryRouter>
            </Provider>
        );

        expect(getByLabelText('Date posted')).toBeInTheDocument();
        expect(getByLabelText('Country')).toBeInTheDocument();
        expect(getByLabelText('Type')).toBeInTheDocument();
        expect(getByLabelText('Event Category')).toBeInTheDocument();
        expect(getByLabelText('Price')).toBeInTheDocument();
    });
});

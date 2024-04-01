import { render, screen } from '@testing-library/react';
import FiltersBar from '../components/FiltersBar';

describe('FiltersBar component', () => {
    it('renders correctly', () => {
        const onFilterMock = jest.fn();
        render(<FiltersBar onFilter={onFilterMock} />);

        expect(screen.getByText('Date posted')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Mode')).toBeInTheDocument();
        expect(screen.getByText('Event Category')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Apply')).toBeInTheDocument();
    });
});

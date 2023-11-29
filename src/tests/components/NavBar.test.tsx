import { render, fireEvent } from '@testing-library/react';
import { TestWrapper } from 'utils/tests';
import NavBar from 'components/NavBar';
import { vi } from 'vitest';

describe('NavBar component', () => {
    const toggleCollapse = vi.fn();
    it('renders correctly and triggers events', () => {
        const { getByLabelText, getByText } = render(
            <TestWrapper>
                <NavBar isCollapsed={false} toggleCollapse={toggleCollapse} />
            </TestWrapper>
        );
        expect(getByText(/ventscape/i)).toBeInTheDocument();
        expect(getByLabelText(/left-arrow/i)).toBeInTheDocument();

        fireEvent.click(getByLabelText(/left-arrow/i));
        expect(toggleCollapse).toHaveBeenCalled();
    });
});

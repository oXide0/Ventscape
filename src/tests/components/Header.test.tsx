import { render } from '@testing-library/react';
import Header from 'components/Header';
import { TestWrapper } from 'utils/tests';

describe('Header component', () => {
    it('should render correctly', () => {
        const { getByText } = render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        );

        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
    });
});

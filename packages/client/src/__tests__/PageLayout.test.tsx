import { render } from '@testing-library/react';
import PageLayout from 'components/ui/PageLayout';

describe('PageLayout component', () => {
    it('renders children correctly', () => {
        const childText = 'Test Child';
        const { getByText } = render(<PageLayout>{childText}</PageLayout>);
        const childElement = getByText(childText);
        expect(childElement).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const childText = 'Test Child';
        const { getByText } = render(<PageLayout>{childText}</PageLayout>);
        const childElement = getByText(childText);
        expect(childElement).toBeInTheDocument();
    });

    it('renders heading correctly', () => {
        const headingText = 'Test Heading';
        const { getByText } = render(
            <PageLayout heading={headingText}>
                <div></div>
            </PageLayout>
        );
        const headingElement = getByText(headingText);
        expect(headingElement).toBeInTheDocument();
    });
});

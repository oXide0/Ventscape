import { render } from '@testing-library/react';
import Title from './Title';

describe('Title component', () => {
	it('renders the component with provided text', () => {
		const { getByText } = render(<Title>Hello, World!</Title>);

		expect(getByText('Hello, World!')).toBeInTheDocument();
	});

	it('applies custom padding top', () => {
		const { getByTestId } = render(<Title pt='30'>Custom Padding</Title>);
		const titleContainer = getByTestId('title-container');

		expect(titleContainer).toHaveClass('pt-30');
	});

	it('passes down additional attributes', () => {
		const { getByText } = render(<Title id='test-id'>Test Title</Title>);
		const titleElement = getByText('Test Title');

		expect(titleElement).toHaveAttribute('id', 'test-id');
	});
});

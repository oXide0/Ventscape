import { render } from '@testing-library/react';
import Title from './Title';

describe('Title component', () => {
	it('renders the component with provided text', () => {
		const { getByText } = render(<Title>Hello, World!</Title>);

		expect(getByText('Hello, World!')).toBeInTheDocument();
	});

	it('passes down additional attributes', () => {
		const { getByText } = render(<Title id='test-id'>Test Title</Title>);
		const titleElement = getByText('Test Title');

		expect(titleElement).toHaveAttribute('id', 'test-id');
	});
});

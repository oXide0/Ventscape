import { render } from '@testing-library/react';
import InfoSnippet from './InfoSnippet';

describe('InfoSnippet component', () => {
	const defaultProps = {
		title: 'Title',
		content: 'Content',
		icon: <svg>MockIcon</svg>,
	};

	it('renders the component with provided props', () => {
		const { getByText } = render(<InfoSnippet {...defaultProps} />);

		expect(getByText('Title')).toBeInTheDocument();
		expect(getByText('Content')).toBeInTheDocument();
		expect(getByText('MockIcon')).toBeInTheDocument();
	});
});

import MessageBox from 'components/ui/MessageBox';
import { render } from '@testing-library/react';

describe('MessageBox component', () => {
    it('renders author correctly', () => {
        const author = 'John Doe';
        const { getByText } = render(<MessageBox author={author} message='Hello World' />);
        const authorElement = getByText(author);
        expect(authorElement).toBeInTheDocument();
    });

    it('renders message correctly', () => {
        const message = 'Hello World\nHow are you?';
        const { getByText } = render(<MessageBox author='John Doe' message={message} />);
        const messageLines = message.split('\n');
        messageLines.forEach((line) => {
            const messageLineElement = getByText(line);
            expect(messageLineElement).toBeInTheDocument();
        });
    });
});

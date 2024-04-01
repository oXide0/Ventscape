import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import Chat from 'components/Chat';

describe('Chat component', () => {
    const messages = [
        { author: 'User', content: 'Hello' },
        { author: 'Bot', content: 'Hi there' }
    ];

    it('renders without crashing', () => {
        render(<Chat messages={messages} onSend={() => {}} />);
    });

    it('displays messages', () => {
        const { getByText } = render(<Chat messages={messages} onSend={() => {}} />);
        messages.forEach(({ content }) => {
            expect(getByText(content)).toBeInTheDocument();
        });
    });

    it('calls onSend with input message when send button is clicked', () => {
        const mockOnSend = jest.fn();
        const { getByPlaceholderText, getByRole } = render(
            <Chat messages={messages} onSend={mockOnSend} />
        );
        const input = getByPlaceholderText('Enter message');
        const sendButton = getByRole('button', { name: 'search' });

        userEvent.type(input, 'New message');
        fireEvent.click(sendButton);

        expect(mockOnSend).toHaveBeenCalled();
        expect(input).toHaveValue('');
    });

    it('calls onSend with input message when enter key is pressed', () => {
        const mockOnSend = jest.fn();
        const { getByPlaceholderText } = render(<Chat messages={messages} onSend={mockOnSend} />);
        const input = getByPlaceholderText('Enter message');

        userEvent.type(input, 'New message');
        fireEvent.submit(input);

        expect(mockOnSend).toHaveBeenCalled();
        expect(input).toHaveValue('');
    });
});

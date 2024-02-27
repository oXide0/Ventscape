import Chat from 'components/Chat';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useState } from 'react';

interface Message {
    author: string;
    content: string;
}

const ChatPage = () => {
    const user = useAppSelector(selectUser);
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = new WebSocket('ws://localhost:5000/api/chat');

    const sendMessage = (message: string) => {
        socket.send(JSON.stringify({ message }));
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages([...messages, { author: user.name || 'User', content: message.message }]);
    };

    return (
        <PageLayout heading='Chat'>
            <Chat messages={messages} onSend={sendMessage} />
        </PageLayout>
    );
};

export default ChatPage;

import {
    Container,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import MessageBox from 'ui/MessageBox';

interface Message {
    author: string;
    content: string;
}

interface ChatProps {
    messages: Message[];
    onSend: (message: string) => void;
}

const Chat = memo(({ messages, onSend }: ChatProps) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = () => {
        setInputMessage('');
        onSend(inputMessage);
    };

    return (
        <Container maxW='4xl' display='flex' flexDirection='column' h='lg'>
            <Stack flex='1 1 auto' pb={32}>
                <Stack spacing={3}>
                    {messages.map((message, index) => (
                        <MessageBox
                            key={index}
                            author={message.author}
                            message={message.content}
                            avatarUrl={null}
                        />
                    ))}
                </Stack>
            </Stack>
            <Stack pos='fixed' maxW='865px' w='100%' bottom={4} zIndex={2}>
                <InputGroup size='md'>
                    <Input
                        placeholder='Enter message'
                        py='6'
                        bg='bg.navbar'
                        boxShadow='0 0 15px #B600E4'
                        border='none !important'
                        _focus={{ boxShadow: '0 0 40px #B600E4', border: 'none !important' }}
                        _placeholder={{ color: '#A000E4' }}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <InputRightElement h='full' w='50px'>
                        <IconButton
                            aria-label='search'
                            bg='#A000E4'
                            color='white'
                            h='full'
                            w='full'
                            _hover={{ bg: '#7D00B3' }}
                            roundedLeft={0}
                            onClick={handleSend}>
                            <IoSend />
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
            </Stack>
        </Container>
    );
});

export default Chat;

import { Avatar, Card, Stack, Text, VStack } from '@chakra-ui/react';

interface MessageBoxProps {
    avatarUrl?: string | null;
    author: string;
    message: string;
}

const MessageBox = ({ avatarUrl, author, message }: MessageBoxProps) => {
    const messageLines = message.split('\n');

    return (
        <Card p={4} border={author === 'AI' ? '1px solid #B600E4' : '1px solid #5056ED'}>
            <Stack direction='row' alignItems='center'>
                <Avatar size='sm' src={avatarUrl ? avatarUrl : ''} name={author} />
                <Text fontWeight='semibold' fontSize='18px'>
                    {author}
                </Text>
            </Stack>
            <VStack pl={10} pt={2} align='start'>
                {messageLines.map((line, index) => (
                    <Text key={index}>{line}</Text>
                ))}
            </VStack>
        </Card>
    );
};

export default MessageBox;

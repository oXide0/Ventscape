import { Avatar, Card, Stack, Text } from '@chakra-ui/react';
import { AiIcon } from 'utils/icons';

interface MessageBoxProps {
    avatarUrl?: string | null;
    author: string;
    message: string;
}

const MessageBox = ({ avatarUrl, author, message }: MessageBoxProps) => {
    return (
        <Card p={4} border={author === 'AI' ? '1px solid #B600E4' : '1px solid #5056ED'}>
            <Stack direction='row' alignItems='center'>
                {author === 'AI' ? (
                    <AiIcon />
                ) : (
                    <Avatar size='sm' src={avatarUrl ? avatarUrl : ''} />
                )}
                <Text fontWeight='semibold' fontSize='18px'>
                    {author}
                </Text>
            </Stack>
            <Text pl={10} pt={2}>
                {message}
            </Text>
        </Card>
    );
};

export default MessageBox;

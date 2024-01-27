import { Card, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface InfoUserCardProps {
    title: string;
    content?: string;
    actions?: React.ReactNode;
    noContentText: string;
}

const InfoUserCard = memo(({ title, content, actions, noContentText }: InfoUserCardProps) => {
    return (
        <Card mt={3} p={6}>
            <Text fontSize='3xl' fontWeight='semibold'>
                {title}
            </Text>
            {content || actions ? (
                <Stack pt={2}>
                    {<Text>{content}</Text>}
                    {actions}
                </Stack>
            ) : (
                <Text>{noContentText}</Text>
            )}
        </Card>
    );
});

export default InfoUserCard;

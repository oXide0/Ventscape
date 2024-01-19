import { Card, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface InfoUserCardProps {
    title: string;
    content?: string;
    items?: React.ReactNode[];
    noItemsText: string;
}

const InfoUserCard = memo(({ title, content, items, noItemsText }: InfoUserCardProps) => {
    return (
        <Card mt={3} p={6}>
            <Text fontSize='3xl' fontWeight='semibold'>
                {title}
            </Text>
            {content || items ? (
                <>
                    {content && <Text>{content}</Text>}
                    {items && (
                        <Stack mt={3} spacing={3} direction='row' flexWrap='wrap'>
                            {items.length ? items : <Text>{noItemsText}</Text>}
                        </Stack>
                    )}
                </>
            ) : (
                <Text>{noItemsText}</Text>
            )}
        </Card>
    );
});

export default InfoUserCard;

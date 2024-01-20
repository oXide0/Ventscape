import { Avatar, Card, Image, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface ProfileCardProps {
    name: string;
    email: string;
    avatarUrl: string;
    bgPhotoUrl: string | null;
    actions?: React.ReactNode;
}

const ProfileCard = memo(({ bgPhotoUrl, avatarUrl, name, email, actions }: ProfileCardProps) => {
    return (
        <Card rounded='md'>
            <Stack pos='relative'>
                <Stack
                    bg={bgPhotoUrl ? 'transparent' : 'gray.500'}
                    roundedTop='md'
                    h='260px'
                    objectFit='cover'
                >
                    {bgPhotoUrl && (
                        <Image src={bgPhotoUrl} roundedTop='md' maxH='260px' objectFit='cover' />
                    )}
                </Stack>
                <Avatar
                    src={avatarUrl ? avatarUrl : 'https://bit.ly/broken-link'}
                    border='2px solid #2F3647'
                    transition='.2s'
                    size='2xl'
                    pos='absolute'
                    bottom={-10}
                    left={10}
                    mt={2}
                />
            </Stack>

            <Stack direction='row' justify='space-between' alignItems='flex-end' p='12'>
                <Stack spacing={0}>
                    <Text fontSize='3xl' fontWeight='semibold'>
                        {name}
                    </Text>
                    <Text>{email}</Text>
                </Stack>
                {actions}
            </Stack>
        </Card>
    );
});

export default ProfileCard;

import { Avatar, Stack, Text } from '@chakra-ui/react';
import { useUserData } from 'hooks/useUserData';
import { memo } from 'react';

interface UserProfileCardProps {
    userId: string;
    showEmail?: boolean;
}

const UserProfileCard = memo(({ userId, showEmail = true }: UserProfileCardProps) => {
    const { avatarUrl, user } = useUserData(userId);

    if (!user) return null;

    return (
        <Stack direction='row' alignItems={showEmail ? 'flex-start' : 'center'}>
            <Avatar src={avatarUrl} name={user.name} />
            <Stack spacing={0}>
                <Text>{user.name}</Text>
                {showEmail && (
                    <Text fontSize='sm' color='text.secondary'>
                        {user.email}
                    </Text>
                )}
            </Stack>
        </Stack>
    );
});

export default UserProfileCard;

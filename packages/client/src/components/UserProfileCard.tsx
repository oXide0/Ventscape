import { Avatar, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useGetUserByIdQuery } from 'services/userApi';

interface UserProfileCardProps {
    userId: string;
    showEmail?: boolean;
}

const UserProfileCard = memo(({ userId, showEmail = true }: UserProfileCardProps) => {
    const { data: user } = useGetUserByIdQuery(userId);

    if (!user) return null;

    return (
        <Stack direction='row' alignItems={showEmail ? 'flex-start' : 'center'}>
            <Avatar src={user.avatarUrl} name={user.name} />
            <Stack>
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

import { Avatar, Stack, Text } from '@chakra-ui/react';
import { useFetching } from 'hooks/useFetching';
import { memo, useEffect, useState } from 'react';
import { getUserAvatar, getUserById } from 'services/userActions';
import { User } from 'types/types';

interface UserProfileCardProps {
    userId: string;
}

const UserProfileCard = memo(({ userId }: UserProfileCardProps) => {
    const [user, setUser] = useState<User>();
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const { fetch } = useFetching(async () => {
        const userServerData = await getUserById(userId);
        if (userServerData) setUser(userServerData);
        const avatar = await getUserAvatar(userId);
        if (avatar) setAvatarUrl(avatar);
    });

    useEffect(() => {
        fetch();
    }, []);

    if (!user) return null;

    return (
        <Stack direction='row'>
            <Avatar src={avatarUrl} name={user.name} />
            <Stack spacing={0}>
                <Text>{user.name}</Text>
                <Text fontSize='sm' color='text.secondary'>
                    {user.email}
                </Text>
            </Stack>
        </Stack>
    );
});

export default UserProfileCard;

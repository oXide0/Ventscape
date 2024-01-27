import { Avatar, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useGetUserByIdQuery } from 'services/userApi';
import { useGetImageUrlQuery } from 'services/imageApi';

interface UserProfileCardProps {
    userId: string;
    showEmail?: boolean;
}

const UserProfileCard = memo(({ userId, showEmail = true }: UserProfileCardProps) => {
    const { data } = useGetUserByIdQuery(userId);
    const { data: avatar } = useGetImageUrlQuery(data?.avatarId, { skip: !data?.avatarId });

    if (!data) return null;

    return (
        <Stack direction='row' alignItems={showEmail ? 'flex-start' : 'center'}>
            <Avatar src={avatar?.url} name={data.name} />
            <Stack>
                <Text>{data.name}</Text>
                {showEmail && (
                    <Text fontSize='sm' color='text.secondary'>
                        {data.email}
                    </Text>
                )}
            </Stack>
        </Stack>
    );
});

export default UserProfileCard;

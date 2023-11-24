import { Avatar, Button, Card, Heading, Stack, Text } from '@chakra-ui/react';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useFetching } from 'hooks/useFetching';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserAvatar, getUserById, updateUser } from 'services/userActions';
import { User } from 'types/types';

const UserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState<User>();
    const [user, setUser] = useState<User>();
    const [avatar, setAvatar] = useState<string>('');
    const userData = useAppSelector(selectUser);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);

    const { fetch, isLoading } = useFetching(async () => {
        if (userId) {
            const serverCreator = await getUserById(userId);
            const user = await getUserById(userData.id);
            const creatorAvatar = await getUserAvatar(userId);
            if (user) {
                if (user.subscriptions.includes(userId)) setIsFollowed(true);
                setUser(user);
            }
            if (serverCreator) setCreator(serverCreator);
            if (creatorAvatar) setAvatar(creatorAvatar);
        }
    });

    const onFollowClick = async () => {
        if (user && userId && creator) {
            await updateUser(
                {
                    ...user,
                    subscriptions: [...user.subscriptions, userId],
                },
                userData.id
            );
            await updateUser(
                { ...creator, followers: [...creator.followers, userData.id] },
                userId
            );
        }
    };

    const onUnfollowClick = async () => {
        if (user && userId && creator) {
            await updateUser(
                {
                    ...user,
                    subscriptions: user.subscriptions.filter((id) => id !== userId),
                },
                userData.id
            );
            await updateUser(
                {
                    ...creator,
                    followers: creator.followers.filter((id) => id !== userData.id),
                },
                userId
            );
        }
    };

    const handleFollow = () => {
        if (!userData.isAuth) navigate('/login');
        if (isFollowed) {
            onUnfollowClick();
            setIsFollowed(false);
        } else {
            onFollowClick();
            setIsFollowed(true);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading || !creator) return <Loader />;

    return (
        <PageLayout>
            <Card p={3}>
                <Heading size='md'>Personal info</Heading>
                <Stack direction='row' alignItems='center' gap={6} pt={3}>
                    <Avatar size='xl' src={avatar} />
                    <Heading size='xl'>{creator.name}</Heading>
                </Stack>
            </Card>
            <Card p={3} mt={4}>
                <Heading size='md'>About</Heading>
                <Text fontSize='lg'>{creator.about}</Text>
            </Card>
            <Stack pt={6}>
                {isFollowed ? (
                    <Button colorScheme='gray' color='text.white' onClick={handleFollow}>
                        Unfollow
                    </Button>
                ) : (
                    <Button colorScheme='brand' color='text.white' onClick={handleFollow}>
                        Follow
                    </Button>
                )}
            </Stack>
        </PageLayout>
    );
};

export default UserPage;

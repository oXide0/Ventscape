import { Box } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import UserProfileCard from 'components/UserProfileCard';
import InfoUserCard from 'components/ui/InfoUserCard';
import Loader from 'components/ui/Loader';
import ProfileCard from 'components/ui/ProfileCard';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useUserData } from 'hooks/useUserData';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from 'services/userActions';
import { User } from 'types/types';

const UserPage = () => {
    const { userId } = useParams();
    const userData = useAppSelector(selectUser);
    const [authUser, setAuthUser] = useState<User>();
    const { user: creator, avatarUrl, userEvents, isLoading, removeEvent } = useUserData(userId);
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const { onFollowClick, onUnfollowClick } = useFollow(authUser, creator, userId, userData.id);

    const followersBlock = useRef<HTMLDivElement | null>(null);
    const subscriptionsBlock = useRef<HTMLDivElement | null>(null);

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
        const getUser = async () => {
            const user = await getUserById(userData.id);
            if (user) {
                setAuthUser(user);
                if (userId && user.subscriptions.includes(userId)) setIsFollowed(true);
            }
        };
        getUser();
    }, []);

    if (isLoading || !creator) return <Loader />;

    return (
        <Box py={6}>
            <ProfileCard
                {...creator}
                avatarUrl={avatarUrl}
                bgPhotoUrl={null}
                paths={{ followersBlock, subscriptionsBlock }}
                showFollowButton={userData.id !== userId}
                onFollowClick={handleFollow}
                isFollowed={isFollowed}
            />
            <InfoUserCard
                title='About'
                content={creator.about}
                noItemsText='This user has no description'
            />
            {creator.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    items={userEvents.map((event) => (
                        <EditEventCard
                            key={event.id}
                            {...event}
                            onRemoveEvent={removeEvent}
                            bgColor='default'
                            showActions={false}
                        />
                    ))}
                    noItemsText='This user has no events'
                />
            )}
            {creator.accountType === 'creator' && (
                <InfoUserCard
                    title='Followers'
                    items={creator.followers.map((userId) => (
                        <UserProfileCard key={userId} userId={userId} />
                    ))}
                    reference={followersBlock}
                    noItemsText='This user has no followers'
                />
            )}
            <InfoUserCard
                title='Subscriptions'
                items={creator.subscriptions.map((userId) => (
                    <UserProfileCard key={userId} userId={userId} />
                ))}
                reference={subscriptionsBlock}
                noItemsText='This user has no subscriptions'
            />
        </Box>
    );
};

export default UserPage;

const useFollow = (
    authUser: User | undefined,
    creator: User | null,
    creatorId: string | undefined,
    authUserId: string
) => {
    const onFollowClick = async () => {
        if (creator && creatorId && authUser) {
            await updateUser(
                {
                    ...authUser,
                    subscriptions: [...authUser.subscriptions, creatorId],
                },
                authUserId
            );
            await updateUser(
                { ...creator, followers: [...creator.followers, authUserId] },
                creatorId
            );
        }
    };

    const onUnfollowClick = async () => {
        if (creator && creatorId && authUser) {
            await updateUser(
                {
                    ...authUser,
                    subscriptions: authUser.subscriptions.filter((id) => id !== creatorId),
                },
                authUserId
            );
            await updateUser(
                {
                    ...creator,
                    followers: authUser.followers.filter((id) => id !== authUserId),
                },
                creatorId
            );
        }
    };
    return { onFollowClick, onUnfollowClick };
};

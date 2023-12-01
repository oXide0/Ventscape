import { Box } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import UserProfileCard from 'components/UserProfileCard';
import InfoUserCard from 'components/ui/InfoUserCard';
import Loader from 'components/ui/Loader';
import ProfileCard from 'components/ui/ProfileCard';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useFollow } from 'hooks/useFollow';
import { useUserData } from 'hooks/useUserData';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from 'services/userActions';
import { User } from 'types/types';

const UserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isAuth, id } = useAppSelector(selectUser);
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const { user, avatarUrl, userEvents, isLoading, removeEvent } = useUserData(userId);
    const { onFollowClick, onUnfollowClick } = useFollow(currentUser, user, userId, id);

    const followersBlock = useRef<HTMLDivElement | null>(null);
    const subscriptionsBlock = useRef<HTMLDivElement | null>(null);

    const handleFollow = () => {
        if (!isAuth) navigate('/login');
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
            const user = await getUserById(id);
            if (user) {
                setCurrentUser(user);
                if (userId && user.subscriptions.includes(userId)) setIsFollowed(true);
            }
        };
        getUser();
    }, []);

    if (isLoading || !user) return <Loader />;

    return (
        <Box py={6}>
            <ProfileCard
                {...user}
                avatarUrl={avatarUrl}
                bgPhotoUrl={null}
                paths={{ followersBlock, subscriptionsBlock }}
                showFollowButton={id !== userId}
                onFollowClick={handleFollow}
                isFollowed={isFollowed}
            />
            <InfoUserCard
                title='About'
                content={user.about}
                noItemsText='This user has no description'
            />
            {user.accountType === 'creator' && (
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
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Followers'
                    items={
                        user.followers &&
                        user.followers.map((userId) => (
                            <UserProfileCard key={userId} userId={userId} />
                        ))
                    }
                    reference={followersBlock}
                    noItemsText='This user has no followers'
                />
            )}
            <InfoUserCard
                title='Subscriptions'
                items={user.subscriptions.map((userId) => (
                    <UserProfileCard key={userId} userId={userId} />
                ))}
                reference={subscriptionsBlock}
                noItemsText='This user has no subscriptions'
            />
        </Box>
    );
};

export default UserPage;

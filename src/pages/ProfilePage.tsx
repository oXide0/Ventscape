import { Box, Heading } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import UserProfileCard from 'components/UserProfileCard';
import InfoUserCard from 'components/ui/InfoUserCard';
import Loader from 'components/ui/Loader';
import ProfileCard from 'components/ui/ProfileCard';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useUserData } from 'hooks/useUserData';
import { useRef } from 'react';

const ProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { user, avatarUrl, userEvents, isLoading, error, removeEvent } = useUserData(id);

    const followersBlock = useRef<HTMLDivElement | null>(null);
    const subscriptionsBlock = useRef<HTMLDivElement | null>(null);

    if (isLoading) return <Loader />;
    if (error || !user)
        return (
            <Heading textAlign='center' pt={6}>
                Your profile is not found
            </Heading>
        );

    return (
        <Box py={6}>
            <ProfileCard
                {...user}
                avatarUrl={avatarUrl}
                bgPhotoUrl={null}
                paths={{ followersBlock, subscriptionsBlock }}
            />
            <InfoUserCard
                title='About'
                content={user.about}
                noItemsText='You have no description'
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
                        />
                    ))}
                    noItemsText='You have no events'
                />
            )}
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Followers'
                    items={user.followers.map((userId) => (
                        <UserProfileCard key={userId} userId={userId} />
                    ))}
                    reference={followersBlock}
                    noItemsText='You have no followers'
                />
            )}
            <InfoUserCard
                title='Subscriptions'
                items={user.subscriptions.map((userId) => (
                    <UserProfileCard key={userId} userId={userId} />
                ))}
                reference={subscriptionsBlock}
                noItemsText='You have no subscriptions'
            />
        </Box>
    );
};

export default ProfilePage;

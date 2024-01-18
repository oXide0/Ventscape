import { Avatar, Button, Card, Heading, Image, Stack } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import InfoUserCard from 'components/InfoUserCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { MdEdit } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteEventMutation, useGetEventsByCreatorIdQuery } from 'services/eventApi';
import { useGetUserByIdQuery } from 'services/userApi';

const ProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const [deleteEvent] = useDeleteEventMutation();
    const { data: user, isSuccess: isUserSuccess, error } = useGetUserByIdQuery(id);
    const { data: events, isSuccess: isEventsSuccess } = useGetEventsByCreatorIdQuery(id);

    const removeEvent = (eventId: string) => {
        deleteEvent(eventId);
    };

    if (!isUserSuccess || !isEventsSuccess) return <Loader />;
    if (error) {
        <Heading textAlign='center' pt={6}>
            Your profile is not found
        </Heading>;
    }

    return (
        <PageLayout>
            <ProfileCard bgPhotoUrl={null} {...user} />
            <InfoUserCard
                title='About'
                content={user.description}
                noItemsText='You have no description'
            />
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    items={events.map((event) => (
                        <EditEventCard
                            key={event.id}
                            onRemoveEvent={removeEvent}
                            bgColor='default'
                            {...event}
                        />
                    ))}
                    noItemsText='You have no events'
                />
            )}
        </PageLayout>
    );
};

export default ProfilePage;

interface ProfileCardProps {
    name: string;
    email: string;
    accountType: 'customer' | 'creator';
    avatarUrl: string;
    description: string;
    bgPhotoUrl: string | null;
    showFollowButton?: boolean;
    onFollowClick?: () => void;
    isFollowed?: boolean;
}

const ProfileCard = ({ showFollowButton = false, ...props }: ProfileCardProps) => {
    return (
        <Card rounded='md'>
            <Stack pos='relative'>
                <BackgroundImage bgPhotoUrl={props.bgPhotoUrl} />
                <ProfileAvatar avatarUrl={props.avatarUrl} />
            </Stack>

            <Stack direction='row' justify='space-between' alignItems='flex-end' p='12'>
                <BottomSection
                    showFollowButton={showFollowButton}
                    onFollowClick={props.onFollowClick}
                    isFollowed={props.isFollowed}
                />
            </Stack>
        </Card>
    );
};

const ProfileAvatar = ({ avatarUrl }: { avatarUrl: string | null }) => {
    return (
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
    );
};

const BackgroundImage = ({ bgPhotoUrl }: { bgPhotoUrl: string | null }) => (
    <Stack bg={bgPhotoUrl ? 'transparent' : 'gray.500'} roundedTop='md' h='260px' objectFit='cover'>
        {bgPhotoUrl && <Image src={bgPhotoUrl} roundedTop='md' maxH='260px' objectFit='cover' />}
    </Stack>
);

interface BottomSectionProps {
    showFollowButton: boolean;
    isFollowed?: boolean;
    onFollowClick?: () => void;
}

const BottomSection = ({ showFollowButton, isFollowed, onFollowClick }: BottomSectionProps) => (
    <Stack w='56'>
        {showFollowButton ? (
            isFollowed ? (
                <Button onClick={onFollowClick}>Unfollow</Button>
            ) : (
                <Button colorScheme='brand' color='text.white' onClick={onFollowClick}>
                    Follow
                </Button>
            )
        ) : (
            <Button
                colorScheme='brand'
                color='text.white'
                display='flex'
                gap={2}
                alignItems='center'
                as={RouterLink}
                to='/profile/edit'
            >
                <MdEdit />
                Edit profile
            </Button>
        )}
    </Stack>
);

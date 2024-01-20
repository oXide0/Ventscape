import { Button, Heading } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import InfoUserCard from 'components/InfoUserCard';
import ProfileCard from 'components/ProfileCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteEventMutation, useGetEventsByCreatorIdQuery } from 'services/eventApi';
import { useGetUserByIdQuery } from 'services/userApi';
import { EditIcon } from 'utils/icons';

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
            <ProfileCard
                bgPhotoUrl={null}
                {...user}
                actions={
                    <Button
                        colorScheme='brand'
                        color='text.white'
                        display='flex'
                        gap={2}
                        alignItems='center'
                        as={RouterLink}
                        to='/profile/edit'
                        maxW='200px'
                        w='full'
                    >
                        <EditIcon />
                        Edit profile
                    </Button>
                }
            />
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

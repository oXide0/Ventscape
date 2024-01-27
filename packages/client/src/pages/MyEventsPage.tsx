import { Heading, Stack } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import Loader from 'components/ui/Loader';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useDeleteEventMutation, useGetEventsByCreatorIdQuery } from 'services/eventApi';
import PageLayout from 'ui/PageLayout';

const MyEventsPage = () => {
    const { id } = useAppSelector(selectUser);
    const { data: events, isSuccess, error, refetch } = useGetEventsByCreatorIdQuery(id);
    const [deleteEvent] = useDeleteEventMutation();

    const removeEvent = async (eventId: string) => {
        deleteEvent(eventId);
        refetch();
    };

    if (!isSuccess) {
        return <Loader />;
    }

    if (error) {
        return (
            <Heading textAlign='center' pt={15}>
                Events not found
            </Heading>
        );
    }

    return (
        <PageLayout heading='Your events'>
            <Stack pt={4} gap={8}>
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        applyButton={false}
                        onRemoveEvent={removeEvent}
                        {...event}
                    />
                ))}
            </Stack>
        </PageLayout>
    );
};

export default MyEventsPage;

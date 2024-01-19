import { Heading, Stack } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import Loader from 'components/ui/Loader';
import { useGetEventsByCreatorIdQuery, useDeleteEventMutation } from 'services/eventApi';
import PageLayout from 'ui/PageLayout';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';

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
            <Stack spacing={4}>
                <Stack direction='row' gap={4} flexWrap='wrap'>
                    {events.map((event) => (
                        <EditEventCard key={event.id} {...event} onRemoveEvent={removeEvent} />
                    ))}
                </Stack>
            </Stack>
        </PageLayout>
    );
};

export default MyEventsPage;

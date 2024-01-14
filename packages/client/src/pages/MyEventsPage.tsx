import { Heading, Stack } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import Loader from 'components/ui/Loader';
import { useGetAllEventsQuery } from 'services/eventApi';
import PageLayout from 'ui/PageLayout';
import { useDeleteEventMutation } from 'services/eventApi';

const MyEventsPage = () => {
    const { data: events, isSuccess, error, refetch } = useGetAllEventsQuery();
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

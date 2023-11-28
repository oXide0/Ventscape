import { Heading, Stack } from '@chakra-ui/react';
import EditEventCard from 'components/EditEventCard';
import { getEvents, deleteEvent } from 'services/eventActions';
import { useFetching } from 'hooks/useFetching';
import Loader from 'components/ui/Loader';
import { useEffect, useState } from 'react';
import { Event } from 'types/types';
import PageLayout from 'ui/PageLayout';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';

const MyEventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const userData = useAppSelector(selectUser);
    const { fetch, isLoading, error } = useFetching(async () => {
        const eventsData = await getEvents();
        const userEvents = eventsData.filter((event) => event.creatorId === userData.id);
        setEvents(userEvents);
    });

    const removeEvent = async (eventId: string) => {
        await deleteEvent(eventId);
        fetch();
    };

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) {
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

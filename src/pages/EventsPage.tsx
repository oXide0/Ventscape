import { Card, Heading, Stack } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import FiltersBar from 'components/FiltersBar';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useFetching } from 'hooks/useFetching';
import { useEffect, useState } from 'react';
import { getEvents } from 'services/eventActions';
import { Event, EventsFilter } from 'types/types';
import { filterEvents } from 'utils/events';

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const { fetch, isLoading, error } = useFetching(async () => {
        const eventsData = await getEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
    });

    const onFilterEvents = (filterData: EventsFilter) => {
        const filteredEvents = filterEvents(events, filterData);
        setFilteredEvents(filteredEvents);
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
        <PageLayout heading='Events'>
            <FiltersBar onFilter={onFilterEvents} />
            <Stack direction='row' justifyContent='space-between' pt={10} gap={8}>
                <Stack direction='column' gap={8}>
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </Stack>
                <Stack w='full' maxW='sm' h='96'>
                    <Card h='full' p={4}>
                        <Heading size='lg'>Liked events</Heading>
                    </Card>
                </Stack>
            </Stack>
        </PageLayout>
    );
};

export default EventsPage;

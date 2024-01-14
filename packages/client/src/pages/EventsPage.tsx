import { Card, Heading, Stack } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import FiltersBar from 'components/FiltersBar';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useState } from 'react';
import { useGetAllEventsQuery } from 'services/eventApi';
import { Event, EventsFilter } from 'shared/types';
import { filterEvents } from 'utils/events';

const EventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const { data: events, isLoading, error } = useGetAllEventsQuery();

    const onFilterEvents = (filterData: EventsFilter) => {
        if (!events) return;
        const filteredEvents = filterEvents(events, filterData);
        setFilteredEvents(filteredEvents);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageLayout heading='Events'>
            <FiltersBar onFilter={onFilterEvents} />
            <Stack direction='row' justifyContent='space-between' pt={10} gap={8}>
                {!filteredEvents.length || error ? (
                    <Stack w='full'>
                        <Heading textAlign='center'>Events not found!</Heading>
                    </Stack>
                ) : (
                    <Stack direction='column' gap={8}>
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </Stack>
                )}
                <Stack
                    w='full'
                    minW={{ base: '52', xl: 'sm' }}
                    h='96'
                    display={{ base: 'none', md: 'block' }}
                >
                    <Card h='full' p={4}>
                        <Heading size='lg'>Liked events</Heading>
                    </Card>
                </Stack>
            </Stack>
        </PageLayout>
    );
};

export default EventsPage;

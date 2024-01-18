import { Stack, Heading } from '@chakra-ui/react';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useEffect, useState } from 'react';
import { useGetAllEventsQuery } from 'services/eventApi';
import { filterEvents } from 'utils/events';
import { IEvent, EventsFilter } from 'types/types';
import FiltersBar from 'components/FiltersBar';
import EventCard from 'components/EventCard';

const AllEventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const { data: events, isLoading, error } = useGetAllEventsQuery();

    const onFilterEvents = (filterData: EventsFilter) => {
        if (!events) return;
        const filteredEvents = filterEvents(events, filterData);
        setFilteredEvents(filteredEvents);
    };

    useEffect(() => {
        if (events) {
            setFilteredEvents(events);
        }
    }, [events]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageLayout>
            <FiltersBar onFilter={onFilterEvents} />
            <Stack pt={10} gap={8}>
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
            </Stack>
        </PageLayout>
    );
};

export default AllEventsPage;

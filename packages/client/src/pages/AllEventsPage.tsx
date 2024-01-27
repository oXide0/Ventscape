import { Heading, Stack, Card } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import FiltersBar from 'components/FiltersBar';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useEffect, useState } from 'react';
import { useGetAllEventsQuery } from 'services/eventApi';
import { IEvent } from 'shared/types';
import { EventsFilter } from 'types/types';
import { filterEvents } from 'utils/events';

const AllEventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const { data, isSuccess, error } = useGetAllEventsQuery();

    const onFilterEvents = (filterData: EventsFilter) => {
        if (!data) return;
        const filteredEvents = filterEvents(data, filterData);
        setFilteredEvents(filteredEvents);
    };

    useEffect(() => {
        if (data) {
            setFilteredEvents(data);
        }
    }, [data]);

    if (!isSuccess) {
        return <Loader />;
    }

    return (
        <PageLayout>
            <FiltersBar onFilter={onFilterEvents} />
            <Stack pt={10} direction='row' justifyContent='space-between'>
                {!filteredEvents.length || error ? (
                    <Heading textAlign='center'>Events not found!</Heading>
                ) : (
                    <Stack direction='column' gap={8}>
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </Stack>
                )}
                <Card p={5} maxW={400} w='full'>
                    <Heading>Saved Events</Heading>
                </Card>
            </Stack>
        </PageLayout>
    );
};

export default AllEventsPage;

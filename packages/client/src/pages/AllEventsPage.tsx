import { Card, Heading, Stack } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import FiltersBar from 'components/FiltersBar';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useEffect, useState } from 'react';
import { useGetAllEventsQuery } from 'services/eventApi';
import { IEvent } from 'shared/types';
import { EventsFilter } from 'types/types';
import { filterEvents } from 'utils/events';
import { useGetSavedEventsByUserIdQuery } from 'services/eventApi';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';
import SavedEventCard from 'components/SavedEventCard';

const AllEventsPage = () => {
    const { id } = useAppSelector(selectUser);
    const { data, isSuccess, error } = useGetAllEventsQuery();
    const { data: savedEvents } = useGetSavedEventsByUserIdQuery(id, { skip: !id });
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

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
                    <Heading w='full' textAlign='center'>
                        Events not found!
                    </Heading>
                ) : (
                    <Stack width='100%' direction='column' gap={8}>
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </Stack>
                )}
                <Card p={5} maxW={400} w='full'>
                    <Heading>Saved Events</Heading>
                    <Stack spacing={4} pt={5}>
                        {savedEvents?.map((event) => (
                            <SavedEventCard key={event.id} {...event} />
                        ))}
                    </Stack>
                </Card>
            </Stack>
        </PageLayout>
    );
};

export default AllEventsPage;

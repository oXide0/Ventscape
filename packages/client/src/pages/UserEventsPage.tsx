import { Heading, Stack } from '@chakra-ui/react';
import EventCard from 'components/EventCard';
import FiltersBar from 'components/FiltersBar';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventsByCreatorIdQuery } from 'services/eventApi';
import { IEvent } from 'shared/types';
import { EventsFilter } from 'types/types';
import { filterEvents } from 'utils/events';

const UserEventsPage = () => {
    const { userId } = useParams();
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const { data, isSuccess, error } = useGetEventsByCreatorIdQuery(userId);

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
        <PageLayout heading='User Events'>
            <FiltersBar onFilter={onFilterEvents} />
            <Stack pt={10} gap={8}>
                {!filteredEvents.length || error ? (
                    <Heading textAlign='center' pt={10}>
                        Events not found!
                    </Heading>
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

export default UserEventsPage;

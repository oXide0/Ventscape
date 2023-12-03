import { useEffect, useState } from 'react';
import { deleteEvent, getEventsByCreatorId } from 'services/eventActions';
import { useFetching } from './useFetching';
import { Event } from 'types/types';

export const useUserEvents = (userId: string | null | undefined) => {
    const [userEvents, setUserEvents] = useState<Event[]>([]);

    const { fetch, isLoading, error } = useFetching(async () => {
        if (!userId) return;
        const events = await getEventsByCreatorId(userId);
        if (events) setUserEvents(events);
    });

    const removeEvent = async (eventId: string) => {
        await deleteEvent(eventId);
        fetch();
    };

    useEffect(() => {
        fetch();
    }, []);

    return { userEvents, isLoading, error, removeEvent };
};

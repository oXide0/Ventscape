import { useState, useEffect } from 'react';
import { useFetching } from 'hooks/useFetching';
import { getUserById, getUserAvatar } from 'services/userActions';
import { getEventsByCreatorId } from 'services/eventActions';
import { deleteEvent } from 'services/eventActions';
import { User, Event } from 'types/types';

export const useUserData = (userId: string | null | undefined) => {
    const [user, setUser] = useState<User | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const { fetch, isLoading, error } = useFetching(async () => {
        if (!userId) return;
        const userServerData = await getUserById(userId);
        const avatar = await getUserAvatar(userId);
        const events = await getEventsByCreatorId(userId);
        if (userServerData) setUser(userServerData);
        if (avatar) setAvatarUrl(avatar);
        if (events) setUserEvents(events);
    });

    const removeEvent = async (eventId: string) => {
        await deleteEvent(eventId);
        fetch();
    };

    useEffect(() => {
        fetch();
    }, []);

    return { user, avatarUrl, userEvents, isLoading, error, removeEvent };
};

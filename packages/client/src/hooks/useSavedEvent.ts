import { selectUser } from 'features/userSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useGetSavedEventsByUserIdQuery,
    useSaveEventMutation,
    useUnsaveEventMutation,
} from 'services/eventApi';
import { useAppSelector } from './redux-hooks';

export const useSavedEvent = (eventId: string) => {
    const { isAuth, id } = useAppSelector(selectUser);
    const { data, refetch } = useGetSavedEventsByUserIdQuery(id, { skip: !id });
    const [saveEvent] = useSaveEventMutation();
    const [unsaveEvent] = useUnsaveEventMutation();
    const [isSavedEvent, setIsSavedEvent] = useState(false);
    const [savedEventId, setSavedEventId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            const savedEvent = data.find((savedEvent) => savedEvent.event.id === eventId);
            if (savedEvent) {
                setSavedEventId(savedEvent.id);
                setIsSavedEvent(true);
            } else {
                setIsSavedEvent(false);
            }
        }
    }, [data]);

    const handleSaveEvent = async () => {
        if (!isAuth || !id) return navigate('/login');
        if (isSavedEvent) {
            setIsSavedEvent(false);
            await unsaveEvent(savedEventId);
        } else {
            setIsSavedEvent(true);
            await saveEvent({ eventId: eventId, userId: id });
        }
    };

    return { isSavedEvent, handleSaveEvent, refetch };
};

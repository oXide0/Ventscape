import EventForm from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { useFetching } from 'hooks/useFetching';
import { useSubmitting } from 'hooks/useSubmitting';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getEvent,
    updateEvent,
    uploadEventImg,
    getEventImg,
    removeEventImg,
} from 'services/eventActions';
import { Event } from 'types/types';
import Loader from 'components/ui/Loader';

const EditEventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const { submit } = useSubmitting(async (event: Event, eventFile: File | null) => {
        if (eventId) {
            await updateEvent(event, eventId);
            if (eventFile) {
                await uploadEventImg(eventFile, event.img);
            } else {
                await removeEventImg(event.img);
            }
        }
    });

    const { fetch, isLoading } = useFetching(async () => {
        if (eventId) {
            const eventData = await getEvent(eventId);
            setEvent(eventData);
            if (eventData) {
                const eventImg = await getEventImg(eventData.img);
                setImgUrl(eventImg);
            }
        }
    });

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageLayout heading='Edit your event'>
            <EventForm submit={submit} eventData={event} img={imgUrl} />
        </PageLayout>
    );
};

export default EditEventPage;

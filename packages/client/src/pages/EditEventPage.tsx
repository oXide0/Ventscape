import EventForm from 'components/EventForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useParams } from 'react-router-dom';
import { useUpdateEventMutation, useGetEventByIdQuery } from 'services/eventApi';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';

interface EventFormValues {
    title: string;
    description: string;
    date: string;
    category: string;
    mode: string;
    country?: string;
    city?: string;
    street?: string;
    link: string;
    price?: number;
}

const EditEventPage = () => {
    const { eventId } = useParams();
    const { id } = useAppSelector(selectUser);
    const { data: event, isLoading } = useGetEventByIdQuery(eventId);
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (event: EventFormValues) => {
        await updateEvent({ id: eventId, creatorId: id, img: '', ...event });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageLayout heading='Edit your event'>
            <EventForm submit={handleSubmit} eventData={event} img={null} />
        </PageLayout>
    );
};

export default EditEventPage;

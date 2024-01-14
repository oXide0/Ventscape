import EventForm from 'components/EventForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useParams } from 'react-router-dom';
import { useCreateEventMutation, useGetEventByIdQuery } from 'services/eventApi';
import { Event } from 'types/types';

const EditEventPage = () => {
    const { eventId } = useParams();
    const { data: event, isLoading } = useGetEventByIdQuery(eventId);
    const [createEvent] = useCreateEventMutation();
    // const [imgUrl, setImgUrl] = useState<string | null>(null);

    const handleSubmit = async (event: Event) => {
        createEvent(event);
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

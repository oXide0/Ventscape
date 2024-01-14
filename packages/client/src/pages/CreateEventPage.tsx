import EventForm from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { Event } from 'shared/types';
import { useCreateEventMutation } from 'services/eventApi';

const CreateEventPage = () => {
    const [createEvent] = useCreateEventMutation();

    const handleSubmit = async (event: Event) => {
        await createEvent(event);
    };

    return (
        <PageLayout heading='Create new event'>
            <EventForm submit={handleSubmit} />
        </PageLayout>
    );
};

export default CreateEventPage;

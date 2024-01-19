import EventForm, { EventFormValues } from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useCreateEventMutation } from 'services/eventApi';

const CreateEventPage = () => {
    const { id } = useAppSelector(selectUser);
    const [createEvent] = useCreateEventMutation();

    const handleSubmit = async (event: EventFormValues) => {
        await createEvent({ creatorId: id, img: '', ...event });
    };

    return (
        <PageLayout heading='Create new event'>
            <EventForm submit={handleSubmit} />
        </PageLayout>
    );
};

export default CreateEventPage;

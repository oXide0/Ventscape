import EventForm from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useCreateEventMutation } from 'services/eventApi';

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

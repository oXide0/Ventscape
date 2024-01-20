import { useToast } from '@chakra-ui/react';
import EventForm, { EventFormValues } from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useCreateEventMutation } from 'services/eventApi';

const CreateEventPage = () => {
    const toast = useToast();
    const { id } = useAppSelector(selectUser);
    const [createEvent] = useCreateEventMutation();

    const handleSubmit = async (event: EventFormValues) => {
        await createEvent({ creatorId: id, img: '', ...event });
        toast({
            title: 'Event created.',
            description: "We've created your event for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };

    return (
        <PageLayout heading='Create new event'>
            <EventForm submit={handleSubmit} />
        </PageLayout>
    );
};

export default CreateEventPage;

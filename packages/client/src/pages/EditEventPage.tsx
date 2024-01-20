import { useToast } from '@chakra-ui/react';
import EventForm, { EventFormValues } from 'components/EventForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useUpdateEventMutation } from 'services/eventApi';

const EditEventPage = () => {
    const toast = useToast();
    const { eventId } = useParams();
    const { id } = useAppSelector(selectUser);
    const { data: event, isSuccess } = useGetEventByIdQuery(eventId);
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (event: EventFormValues) => {
        await updateEvent({ id: eventId, creatorId: id, img: '', ...event });
        toast({
            title: 'Event updated.',
            description: "We've updated your event for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };

    if (!isSuccess) {
        return <Loader />;
    }

    return (
        <PageLayout heading='Edit your event'>
            <EventForm submit={handleSubmit} eventData={event} img={null} />
        </PageLayout>
    );
};

export default EditEventPage;

import { useToast } from '@chakra-ui/react';
import EventForm, { EventFormValues } from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useCreateEventMutation } from 'services/eventApi';
import { useUploadEventImageMutation } from 'services/fileApi';

const CreateEventPage = () => {
    const toast = useToast();
    const { id } = useAppSelector(selectUser);
    const [createEvent] = useCreateEventMutation();
    const [uploadEventImage] = useUploadEventImageMutation();

    const handleSubmit = async (event: EventFormValues, img: File | null) => {
        try {
            if (!id) throw new Error('User not logged in.');
            const imgData = await uploadEventImage({ file: img }).unwrap();

            await createEvent({
                creatorId: id,
                imgId: imgData ? imgData.fileId : '',
                ...event,
            }).unwrap();
            toast({
                title: 'Event created.',
                description: "We've created your event for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred.',
                description: "We couldn't create your event, please try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <PageLayout heading='Create new event'>
            <EventForm submit={handleSubmit} />
        </PageLayout>
    );
};

export default CreateEventPage;

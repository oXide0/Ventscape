import { useToast } from '@chakra-ui/react';
import EventForm, { EventFormValues } from 'components/EventForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useUpdateEventMutation } from 'services/eventApi';
import {
    useGetEventImageUrlQuery,
    useRemoveEventImageMutation,
    useUploadEventImageMutation,
} from 'services/imageApi';
import { mapEventToEventFormValues } from 'utils/events';

const EditEventPage = () => {
    const toast = useToast();
    const { eventId } = useParams();
    const { data, isSuccess } = useGetEventByIdQuery(eventId);
    const { data: imgUrl } = useGetEventImageUrlQuery(data?.imgId, {
        skip: !data?.imgId,
    });
    const [uploadEventImage] = useUploadEventImageMutation();
    const [removeEventImage] = useRemoveEventImageMutation();
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (event: EventFormValues, image: File | null) => {
        try {
            if (!eventId || !data) throw new Error('Event not found.');

            if (data.imgId) {
                await removeEventImage(data.imgId).unwrap();
            }
            if (!image) {
                await updateEvent({
                    id: data.id,
                    creatorId: data.creatorId,
                    imgId: '',
                    ...event,
                }).unwrap();
            } else {
                const imgData = await uploadEventImage({ image }).unwrap();
                const imageId = imgData.id || '';
                await updateEvent({
                    id: eventId,
                    creatorId: data.creatorId,
                    imgId: imageId,
                    ...event,
                }).unwrap();
            }

            toast({
                title: 'Event updated.',
                description: "We've updated your event for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred.',
                description: "We couldn't update your event, please try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    if (!isSuccess) {
        return <Loader />;
    }

    return (
        <PageLayout heading='Edit your event'>
            <EventForm
                submit={handleSubmit}
                eventData={mapEventToEventFormValues(data)}
                imgUrl={imgUrl?.url}
            />
        </PageLayout>
    );
};

export default EditEventPage;

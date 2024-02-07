import { useToast } from '@chakra-ui/react';
import EventForm, { EventFormValues } from 'components/EventForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useUpdateEventMutation } from 'services/eventApi';
import {
    useGetImageUrlQuery,
    useRemoveImageMutation,
    useUploadImageMutation
} from 'services/imageApi';
import { ImageValues } from 'types/types';
import { mapEventToEventFormValues } from 'utils/events';

const EditEventPage = () => {
    const toast = useToast();
    const { eventId } = useParams();
    const { data, isSuccess } = useGetEventByIdQuery(eventId);
    const { data: img } = useGetImageUrlQuery(data?.imgId, {
        skip: !data?.imgId
    });
    const [uploadEventImage] = useUploadImageMutation();
    const [removeEventImage] = useRemoveImageMutation();
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (event: EventFormValues, image: ImageValues) => {
        try {
            if (!data) throw new Error('Event not found.');
            if (!image.file && image.url) {
                await updateEvent({ ...data, ...event }).unwrap();
            } else if (!image.file && !image.url) {
                if (data.imgId) await removeEventImage(data.imgId).unwrap();
                await updateEvent({
                    id: data.id,
                    creatorId: data.creatorId,
                    imgId: '',
                    ...event
                }).unwrap();
            } else if (image.file && image.url) {
                if (data.imgId) await removeEventImage(data.imgId).unwrap();
                const imgData = await uploadEventImage({ image: image.file }).unwrap();
                await updateEvent({
                    id: data.id,
                    creatorId: data.creatorId,
                    imgId: imgData.id,
                    ...event
                }).unwrap();
            }

            toast({
                title: 'Event updated.',
                description: "We've updated your event for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred.',
                description: "We couldn't update your event, please try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
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
                imgUrl={img?.url}
            />
        </PageLayout>
    );
};

export default EditEventPage;

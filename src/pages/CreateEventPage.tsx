import { nanoid } from '@reduxjs/toolkit';
import EventForm from 'components/EventForm';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useSubmitting } from 'hooks/useSubmitting';
import { createEvent, uploadEventImg } from 'services/eventActions';
import { Event, ImageValues } from 'types/types';

const CreateEventPage = () => {
    const { id } = useAppSelector(selectUser);
    const { submit } = useSubmitting(async (event: Event, eventImage: ImageValues) => {
        if (id) {
            const imgId = nanoid();
            await createEvent(event, id, imgId);
            await uploadEventImg(eventImage.file, imgId);
        }
    });

    return (
        <PageLayout heading='Create new event'>
            <EventForm submit={submit} />
        </PageLayout>
    );
};

export default CreateEventPage;

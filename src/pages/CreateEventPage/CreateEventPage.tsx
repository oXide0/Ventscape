import { useAuth } from 'hooks/useAuth';
import { useSubmiting } from 'hooks/useSubmiting';
import { nanoid } from '@reduxjs/toolkit';
import { createEvent, uploadEventImg } from 'services/eventActions';
import EventForm from 'components/EventForm/EventForm';
import { SpinnerCircular } from 'spinners-react';

const CreateEventPage = () => {
	const { userData } = useAuth();
	const { submitting, isSubmitting, error } = useSubmiting(async (event, eventFile) => {
		if (userData.id) {
			const eventId = nanoid();
			await createEvent(event, userData.id, eventId);
			await uploadEventImg(eventFile, eventId);
		}
	});

	if (isSubmitting) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	return (
		<div>
			<EventForm submit={submitting} error={error} title='Create new event' />
		</div>
	);
};

export default CreateEventPage;

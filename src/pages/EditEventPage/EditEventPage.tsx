import { useParams } from 'react-router-dom';
import { useSubmiting } from 'hooks/useSubmiting';

import { updateEvent } from 'services/eventActions';
import { SpinnerCircular } from 'spinners-react';
import EventForm from 'components/EventForm/EventForm';

const EditEventPage = () => {
	const { id } = useParams();

	const { submitting, isSubmitting, error } = useSubmiting(async (data) => {
		if (id) {
			await updateEvent(data, id);
		}
	});

	if (isSubmitting) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	return <EventForm submit={submitting} title='Edit your event' error={error} edit id={id} />;
};

export default EditEventPage;

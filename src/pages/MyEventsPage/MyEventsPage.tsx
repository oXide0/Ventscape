import { useFetching } from '../../hooks/useFetching';
import { IEvent } from '../../types/types';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import ErrorTitle from '../../components/ErrorTitle/ErrorTitle';
import { SpinnerCircular } from 'spinners-react';
import { useAuth } from '../../hooks/useAuth';
import { deleteEvent } from '../../services/eventActions';
import List from '../../components/List/List';

const MyEventsPage = () => {
	const { userData } = useAuth();
	const [events, setEvents] = useState<IEvent[]>([]);
	const { fetching, isLoading, error } = useFetching(async () => {
		const data = await getDocs(collection(db, 'events'));
		const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as IEvent));
		const myEvents = filteredData.filter((event) => event.creatorId === userData.id);
		setEvents(myEvents);
	});

	useEffect(() => {
		fetching();
	}, []);

	const removeEvent = (eventId: string) => {
		deleteEvent(eventId);
		fetching();
	};

	if (error) {
		return <ErrorTitle>Something went wrong😕</ErrorTitle>;
	}

	if (isLoading) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	if (events.length === 0) {
		return <ErrorTitle>No events found😦</ErrorTitle>;
	}

	return (
		<div className='p-10 flex flex-wrap gap-4'>
			<List
				items={events}
				renderItem={(event: IEvent) => (
					<EventCard key={event.id} variant='edit' {...event} onRemoveEvent={removeEvent} />
				)}
			/>
		</div>
	);
};

export default MyEventsPage;

import { useFetching } from 'hooks/useFetching';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { deleteEvent } from 'services/eventActions';
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { IEvent } from 'types/types';
import EventCard from 'components/EventCard/EventCard';
import Title from 'components/UI/Title/Title';
import { SpinnerCircular } from 'spinners-react';
import List from 'components/List/List';
import Container from 'components/UI/Container/Container';

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

	const removeEvent = async (eventId: string) => {
		await deleteEvent(eventId);
		fetching();
	};

	if (error) {
		return <Title>Something went wrong😕</Title>;
	}

	if (isLoading) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	if (events.length === 0) {
		return <Title>No events found😦</Title>;
	}

	return (
		<Container styles='p-10 flex flex-wrap gap-4'>
			<List
				items={events}
				renderItem={(event: IEvent) => (
					<EventCard key={event.id} variant='edit' {...event} onRemoveEvent={removeEvent} />
				)}
			/>
		</Container>
	);
};

export default MyEventsPage;

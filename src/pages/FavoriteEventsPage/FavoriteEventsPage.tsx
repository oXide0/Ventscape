import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { IEvent } from '../../types/types';
import ErrorTitle from '../../components/ErrorTitle/ErrorTitle';
import { SpinnerCircular } from 'spinners-react';
import { useFetching } from '../../hooks/useFetching';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectFavoriteEvents } from '../../features/eventSlice';

const FavoriteEventsPage = () => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const [events, setEvents] = useState<IEvent[]>([]);
	const { fetching, isLoading, error } = useFetching(async () => {
		const data = await getDocs(collection(db, 'events'));
		const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as IEvent));
		const filteredFavoriteEvents = filteredData.filter((event) => favoriteEvents.includes(event.id));
		setEvents(filteredFavoriteEvents);
	});

	useEffect(() => {
		fetching();
	}, [favoriteEvents]);

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

	return (
		<div className='p-10'>
			<h1 className='text-4xl font-bold text-center'>Your favorites events</h1>
			<div className='flex flex-wrap gap-4 pt-10'>
				{events.map((event) => (
					<EventCard key={event.id} {...event} />
				))}
			</div>
		</div>
	);
};

export default FavoriteEventsPage;

import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { IEvent, IEventsFilter } from '../../types/types';
import Title from '../../components/Title/Title';
import { SpinnerCircular } from 'spinners-react';
import { useFetching } from '../../hooks/useFetching';
import List from '../../components/List/List';
import FiltersBar from '../../components/FilterBar/FiltersBar';
import { filterEvents } from '../../utils/events';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectFavoriteEvents } from '../../features/eventSlice';

const EventsPage = () => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [filter, setFilter] = useState<IEventsFilter>({
		datePosted: 'Date posted',
		country: 'Country',
		type: 'Type',
		category: 'Event Category',
		price: 'Price',
	});
	const { fetching, isLoading, error } = useFetching(async () => {
		const data = await getDocs(collection(db, 'events'));
		const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as IEvent));
		setEvents(filteredData);
	});

	const isEventLiked = (id: string) => {
		return favoriteEvents.includes(id);
	};

	useEffect(() => {
		fetching();
	}, []);

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

	if (!events.length) {
		return <Title>No events found😦</Title>;
	}

	return (
		<div className='px-10 py-4'>
			<FiltersBar setFilter={setFilter} />
			<div className='pt-10 flex flex-wrap gap-4'>
				<List
					items={filterEvents(events, filter)}
					renderItem={(event: IEvent) => (
						<EventCard key={event.id} variant='default' isLiked={isEventLiked(event.id)} {...event} />
					)}
				/>
			</div>
		</div>
	);
};

export default EventsPage;

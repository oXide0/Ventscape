import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { IEvent, IEventsFilter } from '../../types/types';
import ErrorTitle from '../../components/ErrorTitle/ErrorTitle';
import { SpinnerCircular } from 'spinners-react';
import { useFetching } from '../../hooks/useFetching';
import List from '../../components/List/List';
import FiltersBar from '../../components/FilterBar/FiltersBar';
import { filterEvents } from '../../utils/events';

const EventsPage = () => {
	const [filter, setFilter] = useState<IEventsFilter>({
		datePosted: 'Date posted',
		country: 'Country',
		type: 'Type',
		category: 'Event Category',
		price: 'Price',
	});
	const [events, setEvents] = useState<IEvent[]>([]);
	const { fetching, isLoading, error } = useFetching(async () => {
		const data = await getDocs(collection(db, 'events'));
		const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as IEvent));
		setEvents(filteredData);
	});

	useEffect(() => {
		fetching();
	}, []);

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

	if (!events.length) {
		return <ErrorTitle>No events found😦</ErrorTitle>;
	}

	return (
		<div className='px-10 py-4'>
			<FiltersBar setFilter={setFilter} />
			<div className='pt-10 flex flex-wrap gap-4'>
				<List
					items={filterEvents(events, filter)}
					renderItem={(event: IEvent) => <EventCard key={event.id} variant='default' {...event} />}
				/>
			</div>
		</div>
	);
};

export default EventsPage;

import { useEffect, useState } from 'react';
import { useFetching } from 'hooks/useFetching';
import { useAppSelector } from 'hooks/redux-hooks';
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { filterEvents } from 'utils/events';
import { IEvent, IEventsFilter } from 'types/types';
import EventCard from 'components/EventCard/EventCard';
import Title from 'components/UI/Title/Title';
import { SpinnerCircular } from 'spinners-react';
import List from 'components/List/List';
import FiltersBar from 'components/FilterBar/FiltersBar';
import Container from 'components/UI/Container/Container';
import { selectFavoriteEvents } from 'features/eventSlice';

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
		filteredData.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return dateA - dateB;
		});
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
		<Container styles='px-10 py-4'>
			<FiltersBar setFilter={setFilter} />
			<div className='flex justify-between pt-10'>
				<div className='flex flex-wrap gap-4'>
					<List
						items={filterEvents(events, filter)}
						renderItem={(event: IEvent) => (
							<EventCard key={event.id} variant='default' isLiked={isEventLiked(event.id)} {...event} />
						)}
					/>
				</div>
			</div>
		</Container>
	);
};

export default EventsPage;

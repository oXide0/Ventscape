import { useEffect, useState } from 'react';
import { useFetching } from 'hooks/useFetching';
import { useAuth } from 'hooks/useAuth';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectFavoriteEvents } from 'features/eventSlice';
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { IEvent } from 'types/types';
import EventCard from 'components/EventCard/EventCard';
import Title from 'components/UI/Title/Title';
import { SpinnerCircular } from 'spinners-react';
import List from 'components/List/List';
import Container from 'components/UI/Container/Container';

const FavoriteEventsPage = () => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const { userData } = useAuth();
	const [events, setEvents] = useState<IEvent[]>([]);
	const { fetching, isLoading, error } = useFetching(async () => {
		if (userData.id) {
			const data = await getDocs(collection(db, 'events'));
			const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as IEvent));
			const filteredFavoriteEvents = filteredData.filter((event) => favoriteEvents.includes(event.id));
			setEvents(filteredFavoriteEvents);
		}
	});

	useEffect(() => {
		fetching();
	}, [favoriteEvents]);

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
		<Container styles='p-10'>
			<Title pt='0'>Your favorites events💜</Title>
			<div className='flex flex-wrap gap-4 pt-10'>
				<List
					items={events}
					renderItem={(event: IEvent) => (
						<EventCard key={event.id} variant='default' isLiked={true} {...event} />
					)}
				/>
			</div>
		</Container>
	);
};

export default FavoriteEventsPage;

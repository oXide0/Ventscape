import { useEffect, useState } from 'react';
import { useAppSelector } from './redux-hooks';
import { selectFavoriteEvents } from '../features/eventSlice';

export const useLiked = (id: string) => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (favoriteEvents) {
			if (favoriteEvents.includes(id)) {
				setIsLiked(true);
			}
		}
	}, []);

	return { isLiked, setIsLiked };
};

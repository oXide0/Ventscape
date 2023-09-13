import { useState, useEffect } from 'react';
import { getEventImg } from 'services/eventActions';

export const useEventImg = (eventId: string) => {
	const [eventImg, setEventImg] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const getAvatar = async () => {
			const url = await getEventImg(eventId);
			if (url) {
				setEventImg(url);
			}
		};
		getAvatar();
		setLoading(false);
	}, []);

	return eventImg;
};

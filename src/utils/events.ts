import { IEvent, IEventsFilter } from 'types/types';

const eventTypes = [
	'Social',
	'Business or Corporate',
	'Educational',
	'Cultural',
	'Sport',
	'Charitable or Fundraising',
	'Political',
	'Religious',
	'Entertainment',
	'Trade and Industry',
	'Community',
	'Environmental',
];

export const getEventImg = (eventType: string) => {
	switch (eventType) {
		case 'Business or Corporate':
			return 'https://woyago.com/wp-content/uploads/2021/11/corporate-event.webp';
		case 'Educational':
			return 'https://cdn.uniacco.com/blog/wp-content/uploads/2021/06/02122221/stem-list-EVgsAbL51Rk-unsplash1-min-1024x576.jpg';
		case 'Cultural':
			return 'https://greenglobaltravel.com/wp-content/uploads/2021/03/Cultural-Festivals-Around-the-World.jpg';
		case 'Sport':
			return 'https://www.habegger.ch/content/uploads/2022/08/sportevent_1-scaled.jpg';
		case 'Charitable or Fundraising':
			return 'https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg';
		case 'Entertainment':
			return 'https://www.ecocaters.com/wp-content/uploads/2019/08/SocialEventIdeasFT.jpg';
		case 'Trade and Industry':
			return 'https://tradeandinvestmentpromotion.com/wp-content/uploads/2020/05/SXSW-Trade-Show-2018-photo-by-merrick-ales-1439x810-1.jpg';
		case 'Social':
			return 'https://www.eventbrite.com/blog/wp-content/uploads/2022/04/xxu.jpg';
		default:
			return;
	}
};

export const sortedEventTypes = eventTypes.sort();

export const filterEventData = (data: IEvent) => {
	if (data.mode === 'Online') {
		return {
			name: data.name,
			about: data.about,
			mode: data.mode,
			category: data.category,
			date: data.date,
			link: data.link,
			price: data.price ? data.price : 0,
			currency: data.currency ? data.currency : '',
			totalParticipants: data.totalParticipants,
		};
	} else {
		return {
			name: data.name,
			about: data.about,
			mode: data.mode,
			category: data.category,
			date: data.date,
			street: data.street,
			city: data.city,
			country: data.country,
			price: data.price ? data.price : 0,
			currency: data.currency ? data.currency : '',
			totalParticipants: data.totalParticipants,
		};
	}
};

function getStartOfWeek(date: Date): Date {
	const dayOfWeek = date.getDay();
	const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
	return new Date(date.setDate(diff));
}

function filterEventsByTime(events: IEvent[], timeFilter: 'thisWeek' | 'nextWeek' | 'nextMonth') {
	const now = new Date();
	const filteredEvents = events.filter((event) => {
		const eventTime = new Date(event.date);
		if (timeFilter === 'thisWeek') {
			const startOfWeek = getStartOfWeek(now);
			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(startOfWeek.getDate() + 7);
			return eventTime >= startOfWeek && eventTime < endOfWeek;
		} else if (timeFilter === 'nextWeek') {
			const startOfNextWeek = new Date(getStartOfWeek(now).getTime() + 7 * 24 * 60 * 60 * 1000);
			const endOfNextWeek = new Date(startOfNextWeek);
			endOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
			return eventTime >= startOfNextWeek && eventTime < endOfNextWeek;
		} else if (timeFilter === 'nextMonth') {
			const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
			const endOfNextMonth = new Date(startOfNextMonth.getFullYear(), startOfNextMonth.getMonth() + 1, 0);
			return eventTime >= startOfNextMonth && eventTime <= endOfNextMonth;
		}
		return false;
	});
	return filteredEvents;
}

export const filterEvents = (events: IEvent[], filters: IEventsFilter) => {
	const { datePosted, country, type, category, price } = filters;
	let filteredEvents = events;
	switch (datePosted) {
		case 'This week':
			filteredEvents = filterEventsByTime(events, 'thisWeek');

			break;
		case 'Next week':
			filteredEvents = filterEventsByTime(events, 'nextWeek');
			break;
		case 'Next month':
			filteredEvents = filterEventsByTime(events, 'nextMonth');
			break;
		default:
			break;
	}

	if (country !== 'Country' && country !== 'All') {
		filteredEvents = filteredEvents.filter((event) => event.country === country);
	}

	if (type !== 'All' && type !== 'Type') {
		filteredEvents = filteredEvents.filter((event) => event.mode === type);
	}

	if (category !== 'Event Category' && category !== 'All') {
		filteredEvents = filteredEvents.filter((event) => event.category === category);
	}

	switch (price) {
		case 'Free':
			filteredEvents = filteredEvents.filter((event) => event.price === 0);
			break;
		case 'Paid':
			filteredEvents = filteredEvents.filter((event) => event.price !== 0);
	}

	return filteredEvents;
};

export const currencies = ['USD', 'EUR', 'GBP', 'CZK', 'CAD', 'UAH', 'PLN'];

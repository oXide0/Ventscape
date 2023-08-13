import { IEvent } from '../types/types';

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
		case 'Social':
			return 'https://www.ecocaters.com/wp-content/uploads/2019/08/SocialEventIdeasFT.jpg';
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
		case 'Political':
			return 'https://www.unh.edu/nh/sites/default/files/styles/max_width_1200px/public/media/2022-04/political-campaign-event.jpeg?itok=IyyTRegQ';
		case 'Religious':
			return 'https://leisuregrouptravel.com/wp-content/uploads/2018/06/Obon-Festival-Japan.jpg';
		case 'Entertainment':
			return 'https://www.avpartners.com/wp-content/uploads/2016/06/choosing-event-entertainment.jpg';
		case 'Trade and Industry':
			return 'https://tradeandinvestmentpromotion.com/wp-content/uploads/2020/05/SXSW-Trade-Show-2018-photo-by-merrick-ales-1439x810-1.jpg';
		case 'Community':
			return 'https://www.eventbrite.com/blog/wp-content/uploads/2022/04/xxu.jpg';
		case 'Environmental':
			return 'https://thehill.com/wp-content/uploads/sites/2/2020/04/ca_plantingtree_41620istock_0.jpg?w=1280&h=720&crop=1';
		default:
			return;
	}
};

export const sortedEventTypes = eventTypes.sort();

export const filterEventData = (data: IEvent) => {
	if (data.kind === 'Online') {
		return {
			name: data.name,
			about: data.about,
			kind: data.kind,
			type: data.type,
			date: data.date,
			link: data.link,
			price: data.price ? data.price : 0,
			totalParticipants: data.totalParticipants,
		};
	} else {
		return {
			name: data.name,
			about: data.about,
			kind: data.kind,
			type: data.type,
			date: data.date,
			street: data.street,
			city: data.city,
			country: data.country,
			price: data.price ? data.price : 0,
			totalParticipants: data.totalParticipants,
		};
	}
};

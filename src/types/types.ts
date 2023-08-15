export type TypeIcon = 'home' | 'events' | 'notifications' | 'add-event' | 'stats' | 'my-events';

export interface IUser {
	id: string;
	name: string;
	password: string;
	about: string;
	firstName: string;
	lastName: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	notifications: boolean;
	country: string;
	userType: string;
}

export interface IEvent {
	id: string;
	name: string;
	about: string;
	mode: string;
	category: string;
	date: string;
	street: string;
	city: string;
	country: string;
	link: string;
	price: number;
	currency: string;
	totalParticipants: number;
	freePlaces: number;
	creatorId: string;
	appliedUsers: string[];
}

export interface IEventsFilter {
	datePosted: string;
	country: string;
	type: string;
	category: string;
	price: string;
}

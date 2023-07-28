export type TypeIcon = 'home' | 'events' | 'notifications' | 'add-event' | 'stats' | 'my-events';

export interface IUser {
	name: string;
	email: string;
	password: string;
	id: string;
	userType: string;
}

export interface IEvent {
	id: string;
	name: string;
	about: string;
	kind: string;
	type: string;
	date: string;
	street: string;
	city: string;
	country: string;
	link: string;
	price: string;
	totalParticipants: number;
	freePlaces: number;
	creatorId: string;
	appliedUsers: string[];
}

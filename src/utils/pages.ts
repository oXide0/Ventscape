import { nanoid } from '@reduxjs/toolkit';

export const pages = [
	{ id: nanoid(), name: 'Home', path: '/' },
	{ id: nanoid(), name: 'Events', path: 'events' },
	{ id: nanoid(), name: 'Profile', path: 'profile' },
	{ id: nanoid(), name: 'Notifications', path: 'notifications' },
	{ id: nanoid(), name: 'Settings', path: 'settings' },
	{ id: nanoid(), name: 'Favorite Events', path: 'events/favorite' },
	{ id: nanoid(), name: 'Create Event', path: 'events/create' },
	{ id: nanoid(), name: 'My events', path: 'events/my' },
];

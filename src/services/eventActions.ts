import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { filterEventData } from 'utils/events';
import { IEvent } from 'types/types';

export const applyForEvent = async (event: IEvent | undefined, id: string | undefined, userId: string | null) => {
	if (event && id) {
		const docRef = doc(db, 'events', id);
		await updateDoc(docRef, {
			freePlaces: event.freePlaces - 1,
			appliedUsers: [...event.appliedUsers, userId],
		});
	}
};

export const unApplyForEvent = async (event: IEvent | undefined, id: string | undefined, userId: string | null) => {
	if (event && id) {
		const docRef = doc(db, 'events', id);
		await updateDoc(docRef, {
			freePlaces: event.freePlaces + 1,
			appliedUsers: event.appliedUsers.filter((id) => id !== userId),
		});
	}
};

export const createEvent = async (event: IEvent, userId: string) => {
	const filteredData = filterEventData(event);
	await addDoc(collection(db, 'events'), {
		...filteredData,
		creatorId: userId,
		freePlaces: event.totalParticipants,
		appliedUsers: [],
	});
};

export const updateEvent = async (event: IEvent, eventId: string) => {
	const filteredData = filterEventData(event);
	const docRef = doc(db, 'events', eventId);
	await updateDoc(docRef, { ...filteredData, freePlaces: event.freePlaces });
};

export const deleteEvent = async (eventId: string) => {
	const eventDoc = doc(db, 'events', eventId);
	await deleteDoc(eventDoc);
};

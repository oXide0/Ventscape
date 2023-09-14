import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from 'config/firebase';
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

export const createEvent = async (event: IEvent, userId: string, imgId: string) => {
	const filteredData = filterEventData(event);
	await addDoc(collection(db, 'events'), {
		...filteredData,
		creatorId: userId,
		freePlaces: event.totalParticipants,
		appliedUsers: [],
		imgId,
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

export const uploadEventImg = async (file: File | null, eventId: string) => {
	if (file === null) return;
	const avatarRef = ref(storage, `events/${eventId}`);
	await uploadBytes(avatarRef, file);
};

export const getEventImg = async (eventId: string) => {
	try {
		const imageRef = ref(storage, `events/${eventId}`);
		const url = await getDownloadURL(imageRef);
		return url;
	} catch (e) {
		return null;
	}
};

export const removeEventImg = async (eventId: string) => {
	const imageRef = ref(storage, `events/${eventId}`);
	await deleteObject(imageRef);
};

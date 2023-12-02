import { doc, updateDoc, collection, addDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { filterEventData } from 'utils/events';
import { Event } from 'types/types';

export const createEvent = async (event: Event, creatorId: string, img: string) => {
    const filteredData = filterEventData(event);
    await addDoc(collection(db, 'events'), {
        ...filteredData,
        creatorId,
        img,
        appliedUsers: [],
    });
};

export const getEvents = async () => {
    const data = await getDocs(collection(db, 'events'));
    const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as Event));
    filteredData.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });
    return filteredData;
};

export const getEventsByCreatorId = async (creatorId: string) => {
    const data = await getDocs(collection(db, 'events'));
    const filteredData = data.docs.map((event) => ({ ...event.data(), id: event.id } as Event));
    const events = filteredData.filter((event) => event.creatorId === creatorId);
    events.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });
    return events;
};

export const getEvent = async (eventId: string) => {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as Event;
    }
    return null;
};

export const updateEvent = async (event: Event, eventId: string) => {
    const filteredData = filterEventData(event);
    const docRef = doc(db, 'events', eventId);
    await updateDoc(docRef, filteredData);
};

export const deleteEvent = async (eventId: string) => {
    const eventDoc = doc(db, 'events', eventId);
    await deleteDoc(eventDoc);
};

export const uploadEventImg = async (file: File | null, imgId: string) => {
    if (file == null) return;
    const avatarRef = ref(storage, `events/${imgId}`);
    await uploadBytes(avatarRef, file);
};

export const getEventImg = async (imgId: string) => {
    try {
        const imageRef = ref(storage, `events/${imgId}`);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (e) {
        return null;
    }
};

export const removeEventImg = async (imgId: string) => {
    const imageRef = ref(storage, `events/${imgId}`);
    await deleteObject(imageRef);
};

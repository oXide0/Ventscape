import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from 'config/firebase';
import { IUser } from 'types/types';

type FormData = {
	name: string;
	email: string;
	pwd: string;
	userType: string;
};

export const updateUser = async (data: IUser, userId: string) => {
	const docRef = doc(db, 'users', userId);
	await updateDoc(docRef, { ...data });
};

export const createUser = async (data: FormData) => {
	const users = await getDocs(collection(db, 'users'));
	const filteredUsers = users.docs.map((user) => ({ ...user.data(), id: user.id } as IUser));
	const foundUser = filteredUsers.find((user) => user.email === data.email);

	if (foundUser) {
		return 'User already exists';
	}

	await addDoc(collection(db, 'users'), {
		name: data.name,
		email: data.email,
		password: data.pwd,
		userType: data.userType,
		about: '',
		firstName: '',
		lastName: '',
		country: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		notifications: false,
		favoriteEvents: [],
	});
};

export const getUser = async (email: string, password: string) => {
	const users = await getDocs(collection(db, 'users'));
	const filteredUsers = users.docs.map((user) => ({ ...user.data(), id: user.id } as IUser));
	const foundUser = filteredUsers.find((user) => user.email === email && user.password === password);
	return foundUser;
};

export const uploadUserAvatar = async (file: File | null, userId: string) => {
	if (file === null) return;
	const avatarRef = ref(storage, `avatars/${userId}`);
	await uploadBytes(avatarRef, file);
};

export const getUserAvatar = async (userId: string) => {
	try {
		const imageRef = ref(storage, `avatars/${userId}`);
		const url = await getDownloadURL(imageRef);
		return url;
	} catch (e) {
		return null;
	}
};

export const removeUserAvatar = async (userId: string) => {
	const imageRef = ref(storage, `avatars/${userId}`);
	await deleteObject(imageRef);
};

export const addEeventToFavorites = async (userId: string, eventId: string) => {
	const favoriteEvents = await getUserFavorites(userId);
	const docRef = doc(db, 'users', userId);
	await updateDoc(docRef, { favoriteEvents: [...favoriteEvents, eventId] });
};

export const removeEventFromFavorites = async (userId: string, eventId: string) => {
	const favoriteEvents = await getUserFavorites(userId);
	const docRef = doc(db, 'users', userId);
	await updateDoc(docRef, { favoriteEvents: favoriteEvents.filter((id: string) => id !== eventId) });
};

export const getUserFavorites = async (userId: string) => {
	const docRef = doc(db, 'users', userId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data().favoriteEvents;
	}
	return [];
};

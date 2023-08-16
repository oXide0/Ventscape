import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { IUser } from '../types/types';

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
	const imageRef = ref(storage, `avatars/${userId}`);
	const url = await getDownloadURL(imageRef);
	return url;
};

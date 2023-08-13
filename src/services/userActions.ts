import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
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

export const createUser = async (data: FormData, userId: string) => {
	const users = await getDocs(collection(db, 'users'));
	const filteredUsers = users.docs.map((user) => ({ ...user.data(), id: user.id } as IUser));
	const foundUser = filteredUsers.find((user) => user.email === data.email);

	if (foundUser) {
		return 'User already exists';
	}

	await addDoc(collection(db, 'users'), {
		id: userId,
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

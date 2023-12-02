import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from 'types/types';
import { setCookie } from 'utils/auth';
import { db, storage } from '../config/firebase';

type FormData = {
    name: string;
    email: string;
    password: string;
    accountType: 'customer' | 'creator';
};

interface UserFormData extends User {
    id: string;
}

export const createUser = async (data: FormData) => {
    const users = await getDocs(collection(db, 'users'));
    const filteredUsers = users.docs.map((user) => ({ ...user.data() } as User));
    const foundUser = filteredUsers.find((user) => user.email === data.email);

    if (foundUser) {
        return 'User already exists';
    }

    await addDoc(collection(db, 'users'), {
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType,
        about: '',
        subscriptions: [],
        followers: [],
        notifications: [],
    });
};

export const updateUser = async (data: User, userId: string) => {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { ...data });
};

export const getUserByEmailAndPassword = async (email: string, password: string) => {
    const users = await getDocs(collection(db, 'users'));
    const filteredUsers = users.docs.map(
        (user) => ({ ...user.data(), id: user.id } as UserFormData)
    );
    const foundUser = filteredUsers.find(
        (user) => user.email === email && user.password === password
    );
    return foundUser;
};

export const getUserById = async (id: string): Promise<User | null> => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as User;
    }
    return null;
};

export const signOutUser = () => {
    setCookie('auth', '', -1, import.meta.env.VITE_AUTH_SECRET_KEY);
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

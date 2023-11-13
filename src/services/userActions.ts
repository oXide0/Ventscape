import { addDoc, collection, getDocs, getDoc, doc } from 'firebase/firestore';
// import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from 'types/types';
import { setCookie } from 'utils/auth';
import { db } from '../firebaseConfig';

type FormData = {
    name: string;
    email: string;
    password: string;
    accountType: string;
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
    });
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

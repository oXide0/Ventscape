import { useAppSelector } from './redux-hooks';
import { selectUser } from '../features/userSlice';

export const useAuth = () => {
	const userData = useAppSelector(selectUser);

	return { userData, isAuth: userData.name ? true : false, userType: userData.userType };
};

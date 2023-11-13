import { useState, useEffect } from 'react';
import { getCookie } from 'utils/auth';
import { getUserById } from 'services/userActions';
import { useAppDispatch } from './redux-hooks';
import { setUserData } from 'features/userSlice';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkCookie = async () => {
            const userId = getCookie('auth', import.meta.env.VITE_AUTH_SECRET_KEY);
            if (userId) {
                const user = await getUserById(userId);
                if (user) {
                    dispatch(
                        setUserData({
                            email: user.email,
                            id: userId,
                            name: user.name,
                            isAuth: true,
                            accountType: user.accountType,
                        })
                    );
                }
            }
            setIsLoading(false);
        };
        checkCookie();
    }, []);

    return { isLoading };
};

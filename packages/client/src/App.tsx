import Loader from 'components/ui/Loader';
import { setUserData } from 'features/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';
import { useGetUserByIdQuery } from 'services/userApi';
import { useGetImageUrlQuery } from 'services/imageApi';

const App = () => {
    const id = localStorage.getItem('userId');
    const dispatch = useAppDispatch();
    const { data: user, isLoading } = useGetUserByIdQuery(id, { skip: !id });
    const { data: avatar } = useGetImageUrlQuery(user?.avatarId, {
        skip: !user?.avatarId,
    });

    useEffect(() => {
        if (user && id) {
            dispatch(
                setUserData({ id, isAuth: true, avatarUrl: avatar ? avatar?.url : null, ...user })
            );
        }
    }, [user, avatar]);

    return isLoading ? <Loader /> : <RouterProvider router={router} />;
};

export default App;

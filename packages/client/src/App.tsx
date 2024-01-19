import Loader from 'components/ui/Loader';
import { setUserData } from 'features/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';
import { useGetUserByIdQuery } from 'services/userApi';

const App = () => {
    const id = localStorage.getItem('userId');
    const dispatch = useAppDispatch();
    const { data: user, isLoading } = useGetUserByIdQuery(id!);

    useEffect(() => {
        if (user && id) {
            dispatch(setUserData({ id, isAuth: true, ...user }));
        }
    }, [user]);

    return isLoading ? <Loader /> : <RouterProvider router={router} />;
};

export default App;

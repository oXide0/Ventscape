import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UnauthenticatedRoutes = () => {
    const location = useLocation();
    const isAuth = localStorage.getItem('accessToken');

    return isAuth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

const AuthenticatedRoutes = () => {
    const location = useLocation();
    const isAuth = localStorage.getItem('accessToken');

    return isAuth ? <Navigate to='/' state={{ from: location }} replace /> : <Outlet />;
};

const CreatorRoutes = () => {
    const location = useLocation();
    const { accountType } = useAppSelector(selectUser);

    return accountType === 'creator' ? (
        <Outlet />
    ) : (
        <Navigate to='/' state={{ from: location }} replace />
    );
};

export { UnauthenticatedRoutes, AuthenticatedRoutes, CreatorRoutes };

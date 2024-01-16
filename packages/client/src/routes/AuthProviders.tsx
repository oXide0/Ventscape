import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const location = useLocation();
    const isAuth = localStorage.getItem('accessToken');

    return isAuth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

const RequireAuthProvider = () => {
    const location = useLocation();
    const isAuth = localStorage.getItem('accessToken');

    return isAuth ? <Navigate to='/' state={{ from: location }} replace /> : <Outlet />;
};

export { RequireAuth, RequireAuthProvider };

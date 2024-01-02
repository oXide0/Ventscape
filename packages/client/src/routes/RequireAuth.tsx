import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const location = useLocation();

    return document.cookie.includes('auth') ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequireAuth;

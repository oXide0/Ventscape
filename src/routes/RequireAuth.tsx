import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const location = useLocation();

    return document.cookie.includes('auth') ? (
        <Outlet />
    ) : (
        <Navigate to='/register' state={{ from: location }} replace />
    );
};

export default RequireAuth;

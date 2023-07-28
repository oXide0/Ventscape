import { useLocation, Outlet, Navigate } from 'react-router-dom';

const RequireAuth = () => {
	const auth = localStorage.getItem('user');
	const location = useLocation();

	return auth ? <Outlet /> : <Navigate to='/signup' state={{ from: location }} replace />;
};

export default RequireAuth;

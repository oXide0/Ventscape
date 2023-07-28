import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CreatorAuth = () => {
	const { userType } = useAuth();
	const location = useLocation();

	return userType === 'creator' ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
};

export default CreatorAuth;

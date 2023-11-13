import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CreatorAuth = () => {
    const location = useLocation();
    const userData = useAppSelector(selectUser);

    return userData.accountType === 'creator' ? (
        <Outlet />
    ) : (
        <Navigate to='/' state={{ from: location }} replace />
    );
};

export default CreatorAuth;

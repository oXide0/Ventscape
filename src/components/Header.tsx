import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { removeUserData, selectUser } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useFetching } from 'hooks/useFetching';
import { memo, useEffect, useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { getUserById, signOutUser, updateUser } from 'services/userActions';
import { User } from 'types/types';
import NotificationBadge from 'ui/NotificationBadge';

const Header = memo(() => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<string[] | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isNotified, setIsNotified] = useState<boolean>(false);
    const { isAuth, id } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const { fetch } = useFetching(async () => {
        const user = await getUserById(id);
        if (user) {
            setCurrentUser(user);
            setNotifications(user.notifications);
            setIsNotified(user.isNotified);
        }
    });

    const onSignOut = () => {
        signOutUser();
        dispatch(removeUserData());
        navigate('/');
    };

    const onClearNotifications = async () => {
        if (!currentUser) return;
        await updateUser({ ...currentUser, isNotified: true }, id);
        setIsNotified(true);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
            {isAuth && currentUser ? (
                <Stack direction='row' alignItems='center'>
                    <NotificationBadge
                        isNotified={isNotified}
                        notifications={notifications}
                        onClear={onClearNotifications}
                    />
                    <Divider orientation='vertical' bg='text.secondary' />
                    <Stack pl={3}>
                        <Button onClick={onSignOut}>Sign out</Button>
                    </Stack>
                </Stack>
            ) : (
                <Stack direction='row' alignItems='center' gap={5}>
                    <Button
                        variant='link'
                        as={ReactRouterLink}
                        to='/login'
                        style={{ textDecoration: 'none' }}
                    >
                        Login
                    </Button>
                    <Button as={ReactRouterLink} to='/register'>
                        Register
                    </Button>
                </Stack>
            )}
        </Box>
    );
});

export default Header;

import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { removeUserData, selectUser } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { memo } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'services/authApi';

const Header = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const { isAuth } = useAppSelector(selectUser);

    const onSignOut = () => {
        logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        dispatch(removeUserData());
        navigate('/');
    };

    return (
        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
            {isAuth ? (
                <Stack direction='row' alignItems='center'>
                    <Divider orientation='vertical' />
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
                    <Divider orientation='vertical' />
                    <Button as={ReactRouterLink} to='/register'>
                        Register
                    </Button>
                </Stack>
            )}
        </Box>
    );
});

export default Header;

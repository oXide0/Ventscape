import { Box, Button, Divider, IconButton, Stack } from '@chakra-ui/react';
import { removeUserData, selectUser } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { memo } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { signOutUser } from 'services/userActions';

const Header = memo(() => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const onSignOut = () => {
        signOutUser();
        dispatch(removeUserData());
        navigate('/');
    };

    return (
        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
            {user.isAuth ? (
                <Stack direction='row' alignItems='center'>
                    <IconButton
                        aria-label='Notifications'
                        icon={<IoIosNotifications size='1.7em' />}
                        background='transparent'
                        variant='unstyled'
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

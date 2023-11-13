import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';
import { selectUser, setUserData } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { memo } from 'react';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { IoIosNotifications } from 'react-icons/io';
import { Link as ReactRouterLink } from 'react-router-dom';
import { signOutUser } from 'services/userActions';

const Header = memo(() => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const onSignOut = () => {
        signOutUser();
        dispatch(setUserData({ name: '', email: '', id: '', isAuth: false, accountType: '' }));
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
                    <Divider orientation='vertical' bg='text.secondary' />э
                    <Popover>
                        <PopoverTrigger>
                            <Stack
                                direction='row'
                                alignItems='center'
                                pl={6}
                                cursor='pointer'
                                py={2}
                                borderRadius={10}
                                _hover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                                transition='.2s'
                            >
                                <Avatar name={user.name} size='sm' />
                                <Text fontSize='md' fontWeight='bold'>
                                    {user.name}
                                </Text>
                                <IconButton aria-label='popup' variant='unstyled'>
                                    <HiMiniChevronDown />
                                </IconButton>
                            </Stack>
                        </PopoverTrigger>
                        <PopoverContent maxW='150px' justifyContent='flex-end'>
                            <Button onClick={onSignOut}>Sign out</Button>
                        </PopoverContent>
                    </Popover>
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

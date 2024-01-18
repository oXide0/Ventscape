import { Avatar, Box, Heading, Stack } from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CalendarIcon, CircleIcon, EventIcon, HomeIcon, UserIcon } from 'utils/icons';
import TabLink from './ui/TabLink';

const NavBar = memo(() => {
    const { accountType, avatarUrl, name } = useAppSelector(selectUser);

    return (
        <Box
            bg='bg.navbar'
            h={{ base: '65px', sm: 'full' }}
            zIndex={2}
            pos='fixed'
            minW={{ base: '100%', sm: '80px', xl: '300px' }}
            p={3}
            bottom={0}
        >
            <Heading textTransform='uppercase' size='lg' pl={4} as={ReactRouterLink} to='/'>
                ventscape
            </Heading>

            <Stack
                pt={{ base: 0, sm: 8 }}
                direction={{ base: 'row', sm: 'column' }}
                height={{ base: 'auto', sm: '95%' }}
            >
                <Stack flex='1 1 auto' direction={{ base: 'row', sm: 'column' }}>
                    <TabLink to='/' label='Home' icon={<HomeIcon />} />
                    <TabLink to='/events' label='Events' icon={<CalendarIcon />} />
                    {accountType === 'creator' && (
                        <>
                            <TabLink
                                to='/events/create'
                                label='Create Event'
                                icon={<CircleIcon />}
                            />
                            <TabLink to='/events/my' label='My events' icon={<EventIcon />} />
                        </>
                    )}
                </Stack>
                <TabLink
                    isBold
                    to='/profile'
                    label='My profile'
                    icon={
                        avatarUrl ? (
                            <Avatar size='sm' src={avatarUrl} name={name ? name : ''} />
                        ) : (
                            <UserIcon />
                        )
                    }
                />
            </Stack>
        </Box>
    );
});

export default NavBar;

import { Avatar, Box, Heading, IconButton, Stack } from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { memo, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiCalendarEvent } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TabLink from 'ui/TabLink';
import { AiIcon } from 'utils/icons';

interface NavBarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

const NavBar = memo(({ isCollapsed, toggleCollapse }: NavBarProps) => {
    const [shouldRenderHeading, setShouldRenderHeading] = useState(!isCollapsed);
    const { accountType, avatar, name } = useAppSelector(selectUser);

    useEffect(() => {
        let timer: NodeJS.Timeout | number;

        if (isCollapsed) {
            setShouldRenderHeading(false);
        } else {
            timer = setTimeout(() => {
                setShouldRenderHeading(true);
            }, 100);
        }
        return () => clearTimeout(timer);
    }, [isCollapsed]);

    return (
        <Box
            bg='bg.navbar'
            h={{ base: '65px', sm: 'full' }}
            zIndex={2}
            pos='fixed'
            minW={{ base: '100%', sm: '80px', xl: isCollapsed ? '80px' : '300px' }}
            p={3}
            transition='.2s'
            bottom={0}
        >
            <Stack
                direction='row'
                justifyContent={{ base: 'center', xl: isCollapsed ? 'center' : 'space-between' }}
                display={{ base: 'none', xl: 'flex' }}
            >
                {shouldRenderHeading && (
                    <Heading textTransform='uppercase' size='lg' pl={4} as={Link} to='/'>
                        ventscape
                    </Heading>
                )}
                <IconButton aria-label='left-arrow' onClick={toggleCollapse} p={3}>
                    {isCollapsed ? (
                        <AiOutlineArrowRight size='1.5em' />
                    ) : (
                        <AiOutlineArrowLeft size='1.5em' />
                    )}
                </IconButton>
            </Stack>

            <Stack
                pt={{ base: 0, sm: 8 }}
                direction={{ base: 'row', sm: 'column' }}
                height={{ base: 'auto', sm: '95%' }}
            >
                <Stack flex='1 1 auto' direction={{ base: 'row', sm: 'column' }}>
                    <TabLink to='/' label='Home' icon={<GoHome />} isCollapsed={isCollapsed} />
                    <TabLink
                        to='/events'
                        label='Events'
                        icon={<BiCalendarEvent />}
                        isCollapsed={isCollapsed}
                    />
                    {accountType === 'creator' && (
                        <>
                            <TabLink
                                to='/events/create'
                                label='Create Event'
                                icon={<IoIosAddCircleOutline />}
                                isCollapsed={isCollapsed}
                            />
                            <TabLink
                                to='/events/my'
                                label='My events'
                                icon={<MdOutlineEventAvailable />}
                                isCollapsed={isCollapsed}
                            />
                        </>
                    )}
                    <TabLink
                        to='/ai-chat'
                        label='AI Chat'
                        icon={<AiIcon />}
                        isCollapsed={isCollapsed}
                    />
                </Stack>

                <TabLink
                    to='/profile'
                    label='My profile'
                    icon={
                        avatar ? <Avatar src={avatar} name={name} size='sm' /> : <FaRegUserCircle />
                    }
                    isCollapsed={isCollapsed}
                    isBold
                />
            </Stack>
        </Box>
    );
});

export default NavBar;

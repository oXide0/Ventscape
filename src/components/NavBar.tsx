import { Box, Heading, IconButton, Stack } from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { memo, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSetting } from 'react-icons/ai';
import { BiCalendarEvent } from 'react-icons/bi';
import { GoHome } from 'react-icons/go';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TabLink from 'ui/TabLink';

interface NavBarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

const NavBar = memo(({ isCollapsed, toggleCollapse }: NavBarProps) => {
    const [shouldRenderHeading, setShouldRenderHeading] = useState(!isCollapsed);
    const userData = useAppSelector(selectUser);

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
            h='full'
            zIndex={2}
            pos='fixed'
            minW={isCollapsed ? '80px' : '300px'}
            p={3}
            transition='.2s'
        >
            <Stack direction='row' justifyContent={isCollapsed ? 'center' : 'space-between'}>
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

            <Stack pt={8} direction='column' height='95%'>
                <Stack flex='1 1 auto'>
                    <TabLink to='/' label='Home' icon={<GoHome />} isCollapsed={isCollapsed} />
                    <TabLink
                        to='/events'
                        label='Events'
                        icon={<BiCalendarEvent />}
                        isCollapsed={isCollapsed}
                    />
                    {userData.accountType === 'creator' && (
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
                </Stack>
                <TabLink
                    to='/settings'
                    label='Settings'
                    icon={<AiOutlineSetting />}
                    isCollapsed={isCollapsed}
                />
            </Stack>
        </Box>
    );
});

export default NavBar;

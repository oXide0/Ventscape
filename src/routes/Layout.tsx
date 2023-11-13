import { Outlet } from 'react-router';
import NavBar from 'components/NavBar';
import Header from 'components/Header';
import { Stack, Box } from '@chakra-ui/react';
import { useState } from 'react';

const Layout = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);

    return (
        <Box maxW='full' h='full' display='flex'>
            <NavBar isCollapsed={isMenuCollapsed} toggleCollapse={toggleMenu} />
            <Stack
                width={isMenuCollapsed ? '96%' : '80%'}
                pl={24}
                pr={12}
                py={4}
                pos='relative'
                left={isMenuCollapsed ? '4%' : '20%'}
                transition='left 0.2s ease'
            >
                <Header />
                <Outlet />
            </Stack>
        </Box>
    );
};

export default Layout;

import { Outlet } from 'react-router';
import NavBar from 'components/NavBar';
import Header from 'components/Header';
import { Stack, Box } from '@chakra-ui/react';
import { useState } from 'react';

const Layout = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);

    return (
        <Box maxW='full' h='full'>
            <NavBar isCollapsed={isMenuCollapsed} toggleCollapse={toggleMenu} />
            <Stack
                width={{ base: 'auto', sm: '96%', xl: isMenuCollapsed ? '96%' : '80%' }}
                pl={{ base: 4, sm: 24 }}
                pr={{ base: 4, sm: 12 }}
                py={4}
                pb={{ base: 20, sm: 0 }}
                pos={{ base: 'static', sm: 'relative' }}
                left={{ base: 0, sm: '4%', xl: isMenuCollapsed ? '4%' : '20%' }}
                transition='left 0.2s ease'
            >
                <Header />
                <Outlet />
            </Stack>
        </Box>
    );
};

export default Layout;

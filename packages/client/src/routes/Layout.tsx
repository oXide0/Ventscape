import { Box, Stack } from '@chakra-ui/react';
import Header from 'components/Header';
import NavBar from 'components/NavBar';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <Box maxW='full' minH='full' display='flex' flexDirection='column'>
            <NavBar />
            <Stack
                width={{ base: 'auto', sm: '96%', xl: '80%' }}
                pl={{ base: 4, sm: 24 }}
                pr={{ base: 4, sm: 12 }}
                py={4}
                pb={{ base: 20, sm: 0 }}
                pos={{ base: 'static', sm: 'relative' }}
                left={{ base: 0, sm: '4%', xl: '20%' }}
            >
                <Header />
                <Outlet />
            </Stack>
        </Box>
    );
};

export default Layout;

import { Box, Spinner } from '@chakra-ui/react';

const Loader = () => {
    return (
        <Box h='100vh'>
            <Spinner thickness='4px' />
        </Box>
    );
};

export default Loader;

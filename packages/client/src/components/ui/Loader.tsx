import { Box, Spinner } from '@chakra-ui/react';

const Loader = () => {
    return (
        <Box height='100vh'>
            <Spinner
                thickness='4px'
                size='xl'
                color='purple.400'
                pos='absolute'
                top='40%'
                left='50%'
            />
        </Box>
    );
};

export default Loader;

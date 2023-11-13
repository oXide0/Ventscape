import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, Flex, Heading, Text, Spinner } from '@chakra-ui/react';

const InProgressPage = () => {
    return (
        <Box
            as='main'
            display='grid'
            placeItems='center'
            px='6'
            py={{ base: '24', sm: '32' }}
            h='full'
        >
            <Box textAlign='center'>
                <Flex justifyContent='center'>
                    <Spinner
                        thickness='8px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='brand.100'
                        size='xl'
                    />
                </Flex>
                <Heading
                    mt='4'
                    fontSize={{ base: '3xl', sm: '5xl' }}
                    fontWeight='bold'
                    color='white'
                >
                    Page is under development
                </Heading>
                <Text mt='6' fontSize='base' lineHeight='7' color='gray.300'>
                    This page is currently not ready and under development.
                </Text>
                <Flex mt='10' alignItems='center' justifyContent='center' gap='6'>
                    <Button as={RouterLink} to='/'>
                        Go back home
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default InProgressPage;

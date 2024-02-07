import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import PageLayout from 'components/ui/PageLayout';
import { Link as RouterLink } from 'react-router-dom';

const InProgressPage = () => {
    return (
        <PageLayout>
            <Spinner
                thickness='10px'
                speed='0.65s'
                emptyColor='gray.200'
                color='brand.100'
                size='xl'
            />
            <Box pt={52}>
                <Heading
                    textAlign='center'
                    mt='4'
                    fontSize={{ base: '3xl', sm: '5xl' }}
                    fontWeight='bold'
                    color='white'>
                    Page is under development
                </Heading>
                <Text textAlign='center' mt='6' fontSize='base' lineHeight='7' color='gray.300'>
                    This page is currently not ready and under development.
                </Text>
                <Flex mt='10' alignItems='center' justifyContent='center' gap='6'>
                    <Button as={RouterLink} to='/'>
                        Go back home
                    </Button>
                </Flex>
            </Box>
        </PageLayout>
    );
};

export default InProgressPage;

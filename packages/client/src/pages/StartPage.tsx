import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Link } from 'react-router-dom';

const StartPage = () => {
    const { name } = useAppSelector(selectUser);

    return (
        <PageLayout>
            {name ? (
                <Heading>Have a great day, {name}!</Heading>
            ) : (
                <Heading>Have a great day!</Heading>
            )}
            <Stack
                textAlign='center'
                alignItems='center'
                bg='bg.navbar'
                rounded={10}
                p={10}
                mt={50}
            >
                <Heading size='3xl'>Find your event</Heading>
                <Heading size='3xl'>Event Platform - Ventscape</Heading>
                <Text fontSize='lg' pt={6}>
                    Introducing my innovative event platform Ventscape – an immersive and seamless
                    online experience that connects you with a world of dynamic events, networking
                    opportunities, and interactive content, right from the comfort of your own
                    space. Elevate your event participation to new heights and embrace a whole new
                    dimension of engagement.
                </Text>
                <Button colorScheme='brand' color='text.white' mt={6} as={Link} to='/events'>
                    Get started
                </Button>
            </Stack>
        </PageLayout>
    );
};

export default StartPage;

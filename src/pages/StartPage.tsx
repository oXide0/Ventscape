import {
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
} from '@chakra-ui/react';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const StartPage = () => {
    const { name } = useAppSelector(selectUser);

    return (
        <PageLayout>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                {name ? (
                    <Heading>Have a great day, {name}!</Heading>
                ) : (
                    <Heading>Have a great day!</Heading>
                )}
                <InputGroup
                    w='100%'
                    maxW={{ base: '250px', xl: '400px' }}
                    mt={2}
                    display={{ base: 'none', md: 'block' }}
                >
                    <InputLeftElement pointerEvents='none'>
                        <AiOutlineSearch size='1.5em' />
                    </InputLeftElement>
                    <Input placeholder='Search ...' focusBorderColor='brand.100' />
                </InputGroup>
            </Stack>
            <Stack
                pt={100}
                textAlign='center'
                alignItems='center'
                bg='bg.navbar'
                rounded={10}
                p={10}
                mt={50}
            >
                <Heading size='3xl'>Meet a new one</Heading>
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

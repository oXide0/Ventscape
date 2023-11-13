import { Box, Heading, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { AiOutlineSearch } from 'react-icons/ai';

const StartPage = () => {
    const user = useAppSelector(selectUser);

    return (
        <Box pt={10}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                {user.name ? (
                    <Heading>Have a great day, {user.name}!</Heading>
                ) : (
                    <Heading>Have a great day!</Heading>
                )}
                <InputGroup maxW='400px' mt={2}>
                    <InputLeftElement pointerEvents='none'>
                        <AiOutlineSearch size='1.5em' />
                    </InputLeftElement>
                    <Input placeholder='Search ...' focusBorderColor='brand.100' />
                </InputGroup>
            </Stack>
        </Box>
    );
};

export default StartPage;

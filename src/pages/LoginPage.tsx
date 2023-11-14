import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { setUserData } from 'features/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useSubmitting } from 'hooks/useSubmitting';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUserByEmailAndPassword } from 'services/userActions';
import { setCookie } from 'utils/auth';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ mode: 'onChange' });
    const { submit } = useSubmitting(async (data: FormData) => {
        const user = await getUserByEmailAndPassword(data.email, data.password);
        if (user) {
            dispatch(
                setUserData({
                    name: user.name,
                    isAuth: true,
                    id: user.id,
                    email: data.email,
                    accountType: user.accountType,
                })
            );
            setCookie('auth', user.id, 7, import.meta.env.VITE_AUTH_SECRET_KEY);
            navigate('/');
        } else {
            setErrorMessage('Invalid credentials');
        }
    });

    const toggleShow = () => setShowPassword(!showPassword);

    const onSubmit = async (data: FormData) => {
        await submit(data);
    };

    return (
        <Box>
            <Heading textAlign='center'>Sign in to your account</Heading>
            <Stack maxW='xl' m='0 auto' pt='20'>
                <Box
                    as='form'
                    display='flex'
                    flexDirection='column'
                    gap={5}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {errorMessage && (
                        <Text color='red.400' fontSize='xl' textAlign='center'>
                            {errorMessage}
                        </Text>
                    )}
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            id='email'
                            placeholder='Your Email'
                            focusBorderColor='brand.100'
                            {...register('email', {
                                required: '*This field is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: '*Please enter a valid email address',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <InputGroup>
                            <Input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Your password'
                                focusBorderColor='brand.100'
                                {...register('password', {
                                    required: '*This field is required',
                                    pattern: {
                                        value: /^\S*$/,
                                        message: '*Password cannot contain spaces',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: '*Password must be at least 6 characters long',
                                    },
                                })}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={toggleShow}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Stack pt={4}>
                        <Button
                            colorScheme='brand'
                            color='text.white'
                            isLoading={isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default LoginPage;

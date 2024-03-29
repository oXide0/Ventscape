import { Box, Button, Text } from '@chakra-ui/react';
import TextField from 'components/TextField';
import PageLayout from 'components/ui/PageLayout';
import { setUserId, setUserAccountType } from 'features/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'services/authApi';
import { isErrorWithMessage } from 'utils/helpers';

interface FormValues {
    email: string;
    password: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginUser, { error }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await loginUser(data).unwrap();
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('userId', response.userId);
            dispatch(setUserId(response.userId));
            dispatch(setUserAccountType(response.accountType));
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <PageLayout heading='Sign in to your account' centered>
            <Box
                as='form'
                display='flex'
                flexDirection='column'
                gap={3}
                onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Text color='red.400' fontSize='xl' textAlign='center'>
                        {error && isErrorWithMessage(error) && error.data.message}
                    </Text>
                )}
                <TextField
                    name='email'
                    type='email'
                    placeholder='Your Email'
                    register={register('email', {
                        required: '*This field is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: '*Please enter a valid email address'
                        }
                    })}
                    errors={errors}
                />
                <TextField
                    name='password'
                    type='password'
                    placeholder='Your password'
                    register={register('password', {
                        required: '*This field is required',
                        pattern: {
                            value: /^\S*$/,
                            message: '*Password cannot contain spaces'
                        },
                        minLength: {
                            value: 6,
                            message: '*Password must be at least 6 characters long'
                        }
                    })}
                    errors={errors}
                />
                <Button
                    colorScheme='brand'
                    color='text.white'
                    isLoading={isSubmitting}
                    type='submit'
                    mt={5}>
                    Submit
                </Button>
            </Box>
        </PageLayout>
    );
};

export default RegisterPage;

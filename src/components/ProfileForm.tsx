import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { memo, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdCloseCircle } from 'react-icons/io';
import { User } from 'types/types';

interface SettingsFormProps {
    userData: User | undefined;
    submit: (data: User) => Promise<void>;
    onEventFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    removeFile: () => void;
    avatarUrl: string | null | undefined;
}

const SettingsForm = memo(
    ({ userData, submit, onEventFileChange, removeFile, avatarUrl }: SettingsFormProps) => {
        const filePicker = useRef<HTMLInputElement>(null);
        const {
            register,
            handleSubmit,
            setValue,
            formState: { errors, isSubmitting },
        } = useForm<User>();

        const onSubmit: SubmitHandler<User> = async (data) => {
            await submit(data);
        };

        const handlePick = () => {
            filePicker.current?.click();
        };

        const onRemoveFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            removeFile();
        };

        useEffect(() => {
            for (const value in userData) {
                setValue(value as keyof User, userData[value as keyof User]);
            }
        }, []);

        return (
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                <Stack pt={6}>
                    <Text fontWeight='semibold'>Avatar</Text>
                    <Avatar
                        src={avatarUrl ? avatarUrl : 'https://bit.ly/broken-link'}
                        cursor='pointer'
                        _hover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                        transition='.2s'
                        size='xl'
                        pos='relative'
                        mt={2}
                        onClick={handlePick}
                    >
                        {avatarUrl && (
                            <IconButton
                                aria-label='remove'
                                onClick={(e) => onRemoveFile(e)}
                                variant='unstyled'
                                pos='absolute'
                                right={-6}
                                top={-3}
                            >
                                <IoMdCloseCircle size='1.7em' />
                            </IconButton>
                        )}
                    </Avatar>

                    <Input
                        ref={filePicker}
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        accept='image/*,.png,.jpg,.gif'
                        onChange={onEventFileChange}
                        size='sm'
                        visibility='hidden'
                        position='absolute'
                        width='0'
                        height='0'
                        opacity={0}
                    />
                </Stack>
                <Grid templateColumns='repeat(6, 1fr)' gap={6} pt={8}>
                    <GridItem colSpan={[6, 3]}>
                        <FormControl id='name' isInvalid={!!errors.name}>
                            <FormLabel>User Name</FormLabel>
                            <Input
                                placeholder='Your name'
                                focusBorderColor='brand.100'
                                {...register('name', { required: 'User name is required' })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl id='about' isInvalid={!!errors.about}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder='Write a few sentences about you.'
                                focusBorderColor='brand.100'
                                {...register('about', { required: 'Description is required' })}
                            />
                            <FormErrorMessage>
                                {errors.about && errors.about.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[6, 3]}>
                        <FormControl id='email' isInvalid={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type='email'
                                placeholder='Your email'
                                focusBorderColor='brand.100'
                                {...register('email', { required: 'Email is required' })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[6, 3]}>
                        <FormControl isInvalid={!!errors.accountType} id='accountType'>
                            <FormLabel>Account type</FormLabel>
                            <Select
                                focusBorderColor='brand.100'
                                {...register('accountType', {
                                    required: 'Account type is required',
                                })}
                                defaultValue='offline'
                            >
                                <option value='customer'>Customer</option>
                                <option value='creator'>Creator</option>
                            </Select>
                            <FormErrorMessage>
                                {errors.accountType && errors.accountType.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button
                    mt={12}
                    colorScheme='brand'
                    color='white'
                    isLoading={isSubmitting}
                    type='submit'
                    w='full'
                >
                    Submit
                </Button>
            </Box>
        );
    }
);

export default SettingsForm;

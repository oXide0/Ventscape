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
import { memo, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdCloseCircle } from 'react-icons/io';
import { User } from 'types/types';
import { useAppDispatch } from 'hooks/redux-hooks';
import { setUserAvatar } from 'features/userSlice';
import { ImageValues } from 'types/types';
import imageCompression from 'browser-image-compression';

interface ProfileFormProps {
    userData: User | null;
    submit: (data: User, avatar: ImageValues) => Promise<void>;
    serverAvatarUrl: string | null | undefined;
}

const ProfileForm = memo(({ userData, submit, serverAvatarUrl }: ProfileFormProps) => {
    const [avatar, setAvatar] = useState<ImageValues>({ file: null, url: serverAvatarUrl });
    const filePicker = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<User>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<User> = async (data) => {
        await submit(data, avatar);
        if (avatar.url) {
            dispatch(setUserAvatar(avatar.url));
        } else if (!avatar.url && !avatar.file) {
            dispatch(setUserAvatar(''));
        }
    };

    const setFile = async (file: File | null) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        if (file) {
            const compressedFile = await imageCompression(file, options);
            setAvatar({ file: compressedFile, url: URL.createObjectURL(compressedFile) });
        }
    };

    const handlePick = () => {
        filePicker.current?.click();
    };

    const onRemoveFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setAvatar({ file: null, url: null });
    };

    const onEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFile(file);
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
                    src={avatar.url ? avatar.url : 'https://bit.ly/broken-link'}
                    cursor='pointer'
                    _hover={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    transition='.2s'
                    size='xl'
                    pos='relative'
                    mt={2}
                    onClick={handlePick}
                >
                    {avatar.url && (
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
                    data-testid='file-upload'
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
                        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                    <FormControl id='about' isInvalid={!!errors.about}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Write a few sentences about you.'
                            focusBorderColor='brand.100'
                            height={32}
                            {...register('about', { required: 'Description is required' })}
                        />
                        <FormErrorMessage>{errors.about && errors.about.message}</FormErrorMessage>
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
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
});

export default ProfileForm;

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
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import imageCompression from 'browser-image-compression';
import { memo, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserRoles } from 'shared/types';
import { ImageValues } from 'types/types';
import { CloseIcon } from 'utils/icons';
import SelectField from './SelectField';
import TextField from './TextField';

export interface ProfileFormValues {
    name: string;
    description: string;
    email: string;
    accountType: UserRoles;
}

interface ProfileFormProps {
    userData: ProfileFormValues | null;
    submit: (data: ProfileFormValues, avatar: ImageValues) => Promise<void>;
    avatarUrl: string | null | undefined;
}

const ProfileForm = memo(({ avatarUrl, submit, userData }: ProfileFormProps) => {
    const [avatar, setAvatar] = useState<ImageValues>({ file: null, url: avatarUrl });
    const filePicker = useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        await submit(data, avatar);
    };

    const setFile = async (file: File | null) => {
        if (!file) return;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setAvatar({ file: compressedFile, url: URL.createObjectURL(compressedFile) });
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
            setValue(value as keyof ProfileFormValues, userData[value as keyof ProfileFormValues]);
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
                            <CloseIcon size='1.7em' />
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
                    <TextField
                        name='name'
                        placeholder='Your or company name'
                        register={register('name', { required: 'User name is required' })}
                        errors={errors}
                    />
                </GridItem>
                <GridItem colSpan={6}>
                    <FormControl id='description' isInvalid={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Write a few sentences description you.'
                            focusBorderColor='brand.100'
                            height={32}
                            {...register('description')}
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <TextField
                        name='email'
                        type='email'
                        placeholder='Your email'
                        register={register('email', { required: 'Email is required' })}
                        errors={errors}
                    />
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <SelectField
                        name='accountType'
                        label='Account type'
                        register={register('accountType', {
                            required: 'Account type is required',
                        })}
                        errors={errors}
                        defaultValue='offline'
                        options={[
                            { value: 'customer', label: 'Customer' },
                            { value: 'creator', label: 'Creator' },
                        ]}
                    />
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

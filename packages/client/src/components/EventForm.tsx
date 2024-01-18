import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    Switch,
} from '@chakra-ui/react';
import imageCompression from 'browser-image-compression';
import ImageUpload from 'components/ImageUpload';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImageValues } from 'types/types';
import { countries, eventCategories } from 'utils/events';
import SelectField from './SelectField';
import TextField from './TextField';

interface EventFormValues {
    title: string;
    description: string;
    date: string;
    category: string;
    mode: string;
    country: string;
    city: string;
    street: string;
    link: string;
    price: number;
}

interface EventFormProps {
    eventData?: EventFormValues | null;
    img?: string | null | undefined;
    submit: (event: EventFormValues) => Promise<void>;
}

const EventForm = memo(({ eventData, img, submit }: EventFormProps) => {
    const [isPaid, setIsPaid] = useState(false);
    const [eventImage, setEventImage] = useState<ImageValues>({ file: null, url: img });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EventFormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
        await submit(data);
        if (!eventData) {
            reset();
            setEventImage({ ...eventImage, file: null, url: null });
        }
    };

    const handleToggle = () => {
        setIsPaid(!isPaid);
    };

    const setFile = async (file: File | null) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        if (file) {
            const compressedFile = await imageCompression(file, options);
            setEventImage({ file: compressedFile, url: URL.createObjectURL(compressedFile) });
        }
    };

    useEffect(() => {
        if (eventData) {
            for (const value in eventData) {
                setValue(value as keyof EventFormValues, eventData[value as keyof EventFormValues]);
            }
        }
    }, []);

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns='repeat(6, 1fr)' gap={6}>
                <GridItem colSpan={[6, 3]}>
                    <TextField
                        name='title'
                        label='Event title'
                        placeholder='Your event'
                        errors={errors}
                        register={register('title', { required: 'Event title is required' })}
                    />
                </GridItem>
                <GridItem colSpan={6}>
                    <TextField
                        name='description'
                        label='Description'
                        placeholder='Write a few sentences about your event.'
                        errors={errors}
                        register={register('description', { required: 'Description is required' })}
                    />
                </GridItem>
                <GridItem colSpan={6}>
                    <ImageUpload setFile={setFile} imgUrl={eventImage.url} />
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <TextField
                        type='datetime-local'
                        name='date'
                        label='Date and Time'
                        placeholder='Write a few sentences about your event.'
                        errors={errors}
                        register={register('date', { required: 'Date and time are require' })}
                    />
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <SelectField
                        name='category'
                        label='Event Category'
                        defaultValue='Select category'
                        register={register('category', { required: 'Category is required' })}
                        errors={errors}
                        options={[...eventCategories]}
                    />
                </GridItem>
                <GridItem colSpan={6}>
                    <SelectField
                        name='mode'
                        label='Online/Offline'
                        register={register('mode', { required: 'Mode is required' })}
                        errors={errors}
                        options={[
                            { label: 'Online', value: 'online' },
                            { label: 'Offline', value: 'offline' },
                        ]}
                    />
                </GridItem>
                {watch('mode') === 'offline' && (
                    <>
                        <GridItem colSpan={[6, 3]}>
                            <SelectField
                                defaultValue='Select country'
                                name='country'
                                register={register('country', { required: 'Country is required' })}
                                errors={errors}
                                options={countries}
                            />
                        </GridItem>
                        <GridItem colSpan={[6, 3]}>
                            <TextField
                                name='city'
                                placeholder='City of event'
                                register={register('city', { required: 'City is required' })}
                                errors={errors}
                            />
                        </GridItem>
                        <GridItem colSpan={[6, 3]}>
                            <TextField
                                name='street'
                                label='Street Address'
                                placeholder='Street address of event'
                                register={register('street', {
                                    required: 'Street address is required',
                                })}
                                errors={errors}
                            />
                        </GridItem>
                    </>
                )}
                <GridItem colSpan={6}>
                    <TextField
                        name='link'
                        label='Link to event'
                        placeholder='Link to event'
                        register={register('link', {
                            required: 'Link to event is required',
                        })}
                        errors={errors}
                    />
                </GridItem>
                <GridItem colSpan={6}>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='price' mb='0' fontSize='1.1rem'>
                            Paid event?
                        </FormLabel>
                        <Switch
                            id='price'
                            size='lg'
                            colorScheme='brand'
                            isChecked={isPaid}
                            onChange={handleToggle}
                        />
                    </FormControl>
                </GridItem>
                {isPaid && (
                    <GridItem colSpan={6}>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.3em'
                                    children='€'
                                />
                                <Input
                                    placeholder='Enter amount'
                                    focusBorderColor='brand.100'
                                    {...register('price')}
                                />
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                )}
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

export default EventForm;

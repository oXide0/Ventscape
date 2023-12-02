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
    Select,
    Switch,
    Textarea,
} from '@chakra-ui/react';
import imageCompression from 'browser-image-compression';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Event, EventImageValues } from 'types/types';
import { countries, eventCategories } from 'utils/events';
import ImageUpload from './ImageUpload';

interface EventFormProps {
    eventData?: Event | null;
    img?: string | null | undefined;
    submit: (event: Event, eventImage: EventImageValues) => Promise<void>;
}

const EventForm = memo(({ eventData, img, submit }: EventFormProps) => {
    const [isPaid, setIsPaid] = useState(false);
    const [eventImage, setEventImage] = useState<EventImageValues>({ file: null, url: img });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { isSubmitting },
    } = useForm<Event>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<Event> = async (data: Event) => {
        await submit(data, eventImage);
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

    const onEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file);
    };

    const removeFile = () => {
        setFile(null);
        setEventImage({ ...eventImage, file: null, url: null });
    };

    useEffect(() => {
        if (eventData) {
            for (const value in eventData) {
                setValue(value as keyof Event, eventData[value as keyof Event]);
            }
        }
    }, []);

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns='repeat(6, 1fr)' gap={6}>
                <GridItem colSpan={[6, 3]}>
                    <FormControl id='name' isRequired>
                        <FormLabel>Event Name</FormLabel>
                        <Input
                            placeholder='Your event'
                            focusBorderColor='brand.100'
                            {...register('name', { required: 'Event name is required' })}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                    <FormControl id='about' isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Write a few sentences about your event.'
                            focusBorderColor='brand.100'
                            {...register('about', { required: 'Description is required' })}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                    <ImageUpload
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        onEventFileChange={onEventFileChange}
                        removeFile={removeFile}
                        imgUrl={eventImage.url}
                    />
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <FormControl id='date' isRequired>
                        <FormLabel>Date and Time</FormLabel>
                        <Input
                            type='datetime-local'
                            focusBorderColor='brand.100'
                            {...register('date', { required: 'Date and time are required' })}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[6, 3]}>
                    <FormControl isRequired id='category'>
                        <FormLabel>Event Category</FormLabel>
                        <Select
                            focusBorderColor='brand.100'
                            {...register('category')}
                            defaultValue=''
                        >
                            <option value='' disabled>
                                Select category
                            </option>
                            {eventCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                    <FormControl isRequired id='mode'>
                        <FormLabel>Online/Offline</FormLabel>
                        <Select
                            focusBorderColor='brand.100'
                            {...register('mode')}
                            defaultValue='online'
                        >
                            <option value='online'>Online</option>
                            <option value='offline'>Offline</option>
                        </Select>
                    </FormControl>
                </GridItem>
                {watch('mode') === 'offline' && (
                    <>
                        <GridItem colSpan={[6, 3]}>
                            <FormControl isRequired id='country'>
                                <FormLabel>Country</FormLabel>
                                <Select
                                    defaultValue=''
                                    focusBorderColor='brand.100'
                                    {...register('country')}
                                >
                                    <option value='' disabled>
                                        Select country
                                    </option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 3]}>
                            <FormControl isRequired id='city'>
                                <FormLabel>City</FormLabel>
                                <Input
                                    placeholder='City of event'
                                    focusBorderColor='brand.100'
                                    {...register('city', { required: 'City is required' })}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 3]}>
                            <FormControl isRequired id='street'>
                                <FormLabel>Street Address</FormLabel>
                                <Input
                                    placeholder='Street address of event'
                                    focusBorderColor='brand.100'
                                    {...register('street', {
                                        required: 'Street address is required',
                                    })}
                                />
                            </FormControl>
                        </GridItem>
                    </>
                )}
                <GridItem colSpan={6}>
                    <FormControl isRequired id='link'>
                        <FormLabel>Link to event</FormLabel>
                        <Input
                            placeholder='Your link to event'
                            focusBorderColor='brand.100'
                            {...register('link', {
                                required: 'Link to event is required',
                            })}
                        />
                    </FormControl>
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

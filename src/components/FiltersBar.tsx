import { Box, Button, Card, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EventsFilter } from 'types/types';
import { countries, eventCategories } from 'utils/events';

interface FiltersBarProps {
    onFilter: (filterData: EventsFilter) => void;
}

const FiltersBar = memo(({ onFilter }: FiltersBarProps) => {
    const { register, handleSubmit } = useForm<EventsFilter>();

    const onSubmit: SubmitHandler<EventsFilter> = (data) => {
        onFilter(data);
    };

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
            <Card direction={{ base: 'column', lg: 'row' }} alignItems='flex-end' gap={3} p={6}>
                <FormControl>
                    <FormLabel htmlFor='datePosted'>Date posted</FormLabel>
                    <Select
                        focusBorderColor='brand.100'
                        id='datePosted'
                        {...register('datePosted')}
                    >
                        <option value='any'>Any time</option>
                        <option value='this-week'>This week</option>
                        <option value='this-month'>This month</option>
                        <option value='this-year'>This year</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='country'>Country</FormLabel>
                    <Select focusBorderColor='brand.100' id='country' {...register('country')}>
                        <option value='all'>All</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='mode'>Type</FormLabel>
                    <Select focusBorderColor='brand.100' id='mode' {...register('mode')}>
                        <option value='all'>All</option>
                        <option value='online'>Online</option>
                        <option value='offline'>Offline</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='category'>Event Category</FormLabel>
                    <Select focusBorderColor='brand.100' id='category' {...register('category')}>
                        <option value='all'>All</option>
                        {eventCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='price'>Price</FormLabel>
                    <Select focusBorderColor='brand.100' id='price' {...register('price')}>
                        <option value='all'>All</option>
                        <option value='free'>Free</option>
                        <option value='paid'>Paid</option>
                    </Select>
                </FormControl>
                <Stack w={{ base: 'full', lg: 'auto' }}>
                    <Button
                        colorScheme='brand'
                        color='text.white'
                        type='submit'
                        px={{ base: 5, xl: 10 }}
                    >
                        Apply
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
});

export default FiltersBar;

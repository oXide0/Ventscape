import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EventsFilter } from 'types/types';
import SelectField from './SelectField';
import { countries, eventCategories } from 'utils/events';
import { Box, Button, Card } from '@chakra-ui/react';

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
                <SelectField
                    name='datePosted'
                    label='Date posted'
                    register={register('datePosted')}
                    options={[
                        { value: 'any', label: 'Any time' },
                        { value: 'this-week', label: 'This week' },
                        { value: 'this-month', label: 'This month' },
                        { value: 'this-year', label: 'This year' },
                    ]}
                />
                <SelectField
                    name='country'
                    register={register('country')}
                    options={[{ value: 'all', label: 'All' }, ...countries]}
                />
                <SelectField
                    name='mode'
                    register={register('mode')}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'online', label: 'Online' },
                        { value: 'offline', label: 'Offline' },
                    ]}
                />
                <SelectField
                    name='category'
                    label='Event Category'
                    register={register('category')}
                    options={[{ value: 'all', label: 'All' }, ...eventCategories]}
                />
                <SelectField
                    name='price'
                    register={register('price')}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'free', label: 'Free' },
                        { value: 'paid', label: 'Paid' },
                    ]}
                />
                <Button
                    colorScheme='brand'
                    color='text.white'
                    type='submit'
                    px={{ base: 5, xl: 10 }}
                >
                    Apply
                </Button>
            </Card>
        </Box>
    );
});

export default FiltersBar;

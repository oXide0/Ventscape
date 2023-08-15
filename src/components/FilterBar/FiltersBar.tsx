import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FilterSelect from '../UI/FilterSelect/FilterSelect';
import { useCountries } from '../../hooks/useCountries';
import { sortedEventTypes } from '../../utils/events';
import Button from '../UI/Button/Button';
import { IEventsFilter } from '../../types/types';

interface FilterBarProps {
	setFilter: (value: IEventsFilter) => void;
}

const FiltersBar = memo(({ setFilter }: FilterBarProps) => {
	const { countries } = useCountries();
	const { register, handleSubmit, reset } = useForm<IEventsFilter>();

	const onSubmit: SubmitHandler<IEventsFilter> = (data) => {
		setFilter(data);
	};

	return (
		<div className='flex flex-col gap-4'>
			<form onSubmit={handleSubmit(onSubmit)} className='flex justify-between'>
				<div className='flex gap-4'>
					<FilterSelect
						title='Date posted'
						options={['Any time', 'This week', 'Next week', 'Next month']}
						register={register('datePosted')}
					/>
					<FilterSelect title='Country' options={['All', ...countries]} register={register('country')} />
					<FilterSelect title='Type' options={['All', 'Online', 'Offline']} register={register('type')} />
					<FilterSelect
						title='Event Category'
						options={['All', ...sortedEventTypes]}
						register={register('category')}
					/>
					<FilterSelect title='Price' options={['All', 'Free', 'Paid']} register={register('price')} />
				</div>
				<div className='flex gap-4'>
					<Button type='reset' variant='secondary' onClick={() => reset()}>
						Reset
					</Button>
					<Button type='submit'>Apply</Button>
				</div>
			</form>
			<div className='border'></div>
		</div>
	);
});

export default FiltersBar;

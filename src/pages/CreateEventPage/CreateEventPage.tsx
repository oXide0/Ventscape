import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../components/UI/Input/Input';
import { inputClasses } from '../../utils/styles';
import { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import { sortedEventTypes } from '../../utils/events';
import { useAuth } from '../../hooks/useAuth';
import ToggleButton from '../../components/UI/ToogleButton/ToggleButton';
import { SpinnerCircular } from 'spinners-react';
import Select from '../../components/UI/Select/Select';
import { useSubmiting } from '../../hooks/useSubmiting';
import { useCountries } from '../../hooks/useCountries';
import { createEvent } from '../../services/eventActions';
import { IEvent } from '../../types/types';

const CreateEventPage = () => {
	const { userData } = useAuth();
	const [activeValue, setActiveValue] = useState(1);
	const countries = useCountries();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IEvent>();
	const { submitting, isSubmitting, error } = useSubmiting(async (event) => {
		if (userData.id) {
			await createEvent(event, userData.id);
			reset();
		}
	});

	const onSubmit: SubmitHandler<IEvent> = async (data) => {
		await submitting(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='p-10 max-w-5xl my-0 mx-auto'>
				{isSubmitting ? (
					<div className='flex justify-center'>
						<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
					</div>
				) : (
					<>
						<h1 className='text-4xl font-bold text-white text-center'>Create new event</h1>
						<div className='pb-12'>
							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<Input
									label='Event Name'
									id='name'
									autoComplete='off'
									placeholder='Your event'
									register={register('name', { required: true })}
									errors={errors}
									className='sm:col-span-3'
								/>

								<div className='col-span-full'>
									<label htmlFor='about' className='block text-sm font-medium leading-6 text-white'>
										Description
									</label>
									<div className='mt-2'>
										<textarea
											id='about'
											rows={3}
											className={inputClasses}
											{...register('about', { required: true })}
										/>
									</div>
									<p className='mt-3 text-sm leading-6 text-gray-400'>
										Write a few sentences about your event.
									</p>
								</div>
							</div>
						</div>

						<div className='pb-12'>
							<h2 className='text-base font-semibold leading-7 text-white'>Event Information</h2>
							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<Select
									label='Online/Offline'
									id='kind'
									register={register('kind', { required: true })}
									options={['Online', 'Offline']}
								/>
								<Select
									label='Type of event'
									id='type'
									register={register('type', { required: true })}
									options={[...sortedEventTypes, 'Other']}
								/>
								<Input
									type='datetime-local'
									label='Date and time'
									placeholder='Date and time'
									id='date'
									autoComplete='date'
									register={register('date', { required: true })}
									errors={errors}
									className='sm:col-span-full'
								/>

								{watch('kind') === 'Offline' ? (
									<>
										<Select
											label='Country'
											id='country'
											register={register('country', { required: true })}
											options={[...countries]}
											width='sm:col-span-full'
										/>
										<Input
											label='City'
											placeholder='City'
											id='city'
											autoComplete='city'
											register={register('city', { required: true })}
											errors={errors}
											className='sm:col-span-3 sm:col-start-1'
										/>

										<Input
											label='Street address'
											placeholder='Street address'
											id='street'
											autoComplete='street'
											register={register('street', { required: true })}
											errors={errors}
											className='sm:col-span-3'
										/>
									</>
								) : (
									<Input
										label='Link to event'
										placeholder='Your link to event'
										id='link'
										autoComplete='off'
										register={register('link', { required: false })}
										errors={errors}
										className='sm:col-span-full'
									/>
								)}
								<div className='flex flex-col gap-3'>
									<div className='flex flex-col gap-2'>
										<label className='block text-sm font-medium leading-6 text-white'>Price</label>
										<ToggleButton
											value1='Free'
											value2='Price'
											activeValue={activeValue}
											setActiveValue={setActiveValue}
										/>
									</div>
									{activeValue === 2 && (
										<Input
											label=''
											placeholder='Price'
											id='price'
											autoComplete='price'
											register={register('price', { required: true })}
											errors={errors}
											className='sm:col-span-3'
										/>
									)}
								</div>
								<Input
									label='Maximum number of participants'
									placeholder='Maximum number of participants'
									id='totalParticipants'
									autoComplete='off'
									type='number'
									register={register('totalParticipants', { required: true, valueAsNumber: true })}
									errors={errors}
									className='sm:col-span-3 h-10'
								/>
							</div>
						</div>
						<div className='pt-5 text-center sm:col-span-2'>
							<p className='text-red-600'>{error}</p>
							<Button className='w-full' type='submit'>
								Add Event
							</Button>
						</div>
					</>
				)}
			</div>
		</form>
	);
};

export default CreateEventPage;

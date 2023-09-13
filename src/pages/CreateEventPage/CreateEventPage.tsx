import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useSubmiting } from 'hooks/useSubmiting';
import { useCountries } from 'hooks/useCountries';
import { inputClasses } from 'utils/styles';
import { sortedEventTypes } from 'utils/events';
import { nanoid } from '@reduxjs/toolkit';
import { createEvent, uploadEventImg } from 'services/eventActions';
import { IEvent } from 'types/types';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import ToggleButton from 'components/UI/ToogleButton/ToggleButton';
import { SpinnerCircular } from 'spinners-react';
import Select from 'components/UI/Select/Select';
import { PhotoIcon } from '@heroicons/react/24/solid';

const CreateEventPage = () => {
	const { userData } = useAuth();
	const [activeValue, setActiveValue] = useState(1);
	const [eventFile, setEventFile] = useState<File | null>(null);
	const { countries, currencies } = useCountries();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IEvent>();
	const { submitting, isSubmitting, error } = useSubmiting(async (event) => {
		if (userData.id) {
			const eventId = nanoid();
			await createEvent(event, userData.id, eventId);
			await uploadEventImg(eventFile, eventId);
			reset();
		}
	});

	const onSubmit: SubmitHandler<IEvent> = async (data) => {
		await submitting(data);
	};

	const onEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setEventFile(file);
		}
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
							<h2 className='text-lg font-semibold leading-7 text-white'>Event Information</h2>
							<div className='col-span-full pt-5'>
								<label htmlFor='cover-photo' className='block text-sm font-medium leading-6'>
									Cover photo
								</label>
								<div className='mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10'>
									<div className='text-center'>
										<PhotoIcon className='mx-auto h-12 w-12 text-gray-100' aria-hidden='true' />
										<div className='mt-4 flex text-sm leading-6 text-gray-100'>
											<label
												htmlFor='file-upload'
												className='relative cursor-pointer rounded-md font-semibold text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
											>
												<span>Upload a file</span>
												<input
													id='file-upload'
													name='file-upload'
													type='file'
													className='sr-only'
													onChange={onEventFileChange}
												/>
											</label>
											<p className='pl-1'>or drag and drop</p>
										</div>
										<p className='text-xs leading-5 text-gray-100'>PNG, JPG, GIF up to 10MB</p>
									</div>
								</div>
							</div>
							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<Select
									label='Online/Offline'
									id='kind'
									register={register('mode', { required: true })}
									options={['Online', 'Offline']}
								/>
								<Select
									label='Type of event'
									id='type'
									register={register('category', { required: true })}
									options={[...sortedEventTypes, 'Other']}
								/>
								<Input
									type='datetime-local'
									label='Date and time'
									placeholder='Date and time'
									id='date'
									register={register('date', { required: true })}
									errors={errors}
									className='sm:col-span-full'
								/>

								{watch('mode') === 'Offline' ? (
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
											register={register('city', { required: true })}
											errors={errors}
											className='sm:col-span-3 sm:col-start-1'
										/>

										<Input
											label='Street address'
											placeholder='Street address'
											id='street'
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
										<div className='flex gap-4 items-center w-52'>
											<Input
												type='number'
												label='Price'
												placeholder='Price'
												id='price'
												register={register('price', { required: true, valueAsNumber: true })}
												errors={errors}
											/>
											<Select
												label='Currency'
												id='currency'
												register={register('currency', { required: true })}
												options={[...currencies, 'Other']}
												width='w-36'
											/>
										</div>
									)}
								</div>
								<Input
									label='Maximum number of participants'
									placeholder='Maximum number of participants'
									id='totalParticipants'
									type='number'
									register={register('totalParticipants', { required: false, valueAsNumber: true })}
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

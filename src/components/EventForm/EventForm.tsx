import { useForm, SubmitHandler } from 'react-hook-form';
import { memo, useEffect, useState } from 'react';
import { useCountries } from 'hooks/useCountries';
import { useFetching } from 'hooks/useFetching';
import { inputClasses } from 'utils/styles';
import { sortedEventTypes, currencies } from 'utils/events';
import { getEventImg } from 'services/eventActions';
import { getDoc, doc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { IEvent } from 'types/types';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import ToggleButton from 'components/UI/ToogleButton/ToggleButton';
import Select from 'components/UI/Select/Select';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { SpinnerCircular } from 'spinners-react';

interface EventFormProps {
	submit: (data: IEvent, eventFile: File | null, imgId: string) => void;
	error: string;
	edit?: boolean;
	eventId?: string;
}

const EventForm = memo(({ submit, error, edit, eventId }: EventFormProps) => {
	const [activeValue, setActiveValue] = useState(1);
	const [eventFile, setEventFile] = useState<File | null>(null);
	const { countries } = useCountries();
	const [imgId, setImgId] = useState<string>('');
	const [imgUrl, setImgUrl] = useState<string>('');
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<IEvent>();

	const { fetching: fetchEvent, isLoading } = useFetching(async () => {
		if (eventId) {
			const docRef = doc(db, 'events', eventId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setValue('name', docSnap.data().name);
				setValue('about', docSnap.data().about);
				setValue('mode', docSnap.data().kind);
				setValue('category', docSnap.data().type);
				setValue('date', docSnap.data().date);
				setValue('freePlaces', docSnap.data().freePlaces);
				setImgId(docSnap.data().imgId);
				if (docSnap.data().kind === 'Offline') {
					setValue('street', docSnap.data().street);
					setValue('city', docSnap.data().city);
					setValue('country', docSnap.data().country);
				} else {
					setValue('link', docSnap.data().link);
				}
				setValue('price', docSnap.data().price);
				setValue('currency', docSnap.data().currency);
				if (docSnap.data().price) {
					setActiveValue(2);
				}
				setValue('totalParticipants', docSnap.data().totalParticipants);
			}
		}
	});

	const onSubmit: SubmitHandler<IEvent> = async (data) => {
		submit(data, eventFile, imgId);
		if (edit) {
			fetchEvent();
		} else {
			reset();
		}
	};

	const setFile = (file: File | null) => {
		if (file) {
			setEventFile(file);
			setImgUrl(URL.createObjectURL(file));
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

	useEffect(() => {
		if (edit) fetchEvent();
	}, []);

	useEffect(() => {
		const getImgUrl = async () => {
			if (imgId) {
				const url = await getEventImg(imgId);
				if (url) setImgUrl(url);
			}
		};
		getImgUrl();
	}, [imgId]);

	if (isLoading) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='p-10 max-w-5xl my-0 mx-auto'>
			<h1 className='text-4xl font-bold text-white text-center'>
				{edit ? 'Edit your event' : 'Create new event'}
			</h1>
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
						<p className='mt-3 text-sm leading-6 text-gray-400'>Write a few sentences about your event.</p>
					</div>
				</div>
			</div>

			<div className='pb-12'>
				<h2 className='text-lg font-semibold leading-7 text-white'>Event Information</h2>
				<div className='col-span-full pt-5'>
					<label htmlFor='cover-photo' className='block text-sm font-medium leading-6'>
						Cover photo
					</label>
					<div
						className='mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10'
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<div className='text-center'>
							{imgUrl ? (
								<img src={imgUrl} alt='event-preview' className='max-h-80 rounded' />
							) : (
								<PhotoIcon className='mx-auto h-12 w-12 text-gray-100' aria-hidden='true' />
							)}
							<div className='mt-4 flex justify-center text-sm leading-6 text-gray-100'>
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
										accept='image/*,.png,.jpg,.gif'
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
						{activeValue === 2 ? (
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
						) : (
							<div className='flex gap-4 items-center w-52'></div>
						)}
					</div>
					<Input
						label='Maximum number of participants(Optional)'
						placeholder='Maximum number of participants'
						id='totalParticipants'
						type='number'
						register={register('totalParticipants', { required: false, valueAsNumber: true })}
						errors={errors}
						className='sm:col-span-3 h-10'
					/>
					{edit && (
						<Input
							label='Free spots(Optional)'
							placeholder='Free spots'
							id='freePlaces'
							autoComplete='off'
							type='number'
							register={register('freePlaces', { required: false, valueAsNumber: true })}
							errors={errors}
							className='sm:col-span-2 h-10'
						/>
					)}
				</div>
			</div>
			<div className='pt-5 text-center sm:col-span-2'>
				<p className='text-red-600'>{error}</p>
				<Button className='w-full' type='submit'>
					{edit ? 'Update event' : 'Create event'}
				</Button>
			</div>
		</form>
	);
});

export default EventForm;

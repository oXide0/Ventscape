import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../components/UI/Input/Input';
import { inputClasses } from '../../utils/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/UI/Button/Button';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { sortedEventTypes } from '../../utils/events';
import ToggleButton from '../../components/UI/ToogleButton/ToggleButton';
import { SpinnerCircular } from 'spinners-react';
import Select from '../../components/UI/Select/Select';
import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';

interface ICountry {
	name: {
		common: string;
	};
}

interface FormDataType {
	name: string;
	about: string;
	kind: string;
	type: string;
	date: string;
	street: string;
	city: string;
	country: string;
	link: string;
	price: string;
	totalParticipants: number;
	freePlaces: number;
}

const EditEventPage = () => {
	const { id } = useParams();
	const [activeValue, setActiveValue] = useState(1);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [countries, setCountries] = useState<string[]>([]);
	const [eventType, setEventType] = useState('Online');
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormDataType>();

	const { fetching: fetchEvent, isLoading: isEventLoading } = useFetching(async () => {
		if (id) {
			const docRef = doc(db, 'events', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setValue('name', docSnap.data().name);
				setValue('about', docSnap.data().about);
				setValue('kind', docSnap.data().kind);
				setValue('type', docSnap.data().type);
				setValue('date', docSnap.data().date);
				setValue('freePlaces', docSnap.data().freePlaces);
				if (docSnap.data().kind === 'Offline') {
					setValue('street', docSnap.data().street);
					setValue('city', docSnap.data().city);
					setValue('country', docSnap.data().country);
				} else {
					setValue('link', docSnap.data().link);
				}
				setValue('price', docSnap.data().price);
				setValue('totalParticipants', docSnap.data().totalParticipants);
			}
		}
	});

	const onSubmit: SubmitHandler<FormDataType> = async (data) => {
		setLoading(true);
		if (id) {
			try {
				const docRef = doc(db, 'events', id);
				await updateDoc(docRef, { ...data });
				fetchEvent();
				setErrorMessage('');
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				}
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await axios.get('https://restcountries.com/v3.1/region/europe');
				const countriesNames = response.data.map((country: ICountry) => country.name.common);
				const sortedCountries = countriesNames.sort();
				setCountries(sortedCountries);
			} catch (err) {
				console.log(err);
			}
		};

		getCountries();
		// Maybe we should use another useEffect for fetchEvent() or something like that
		fetchEvent();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='p-10 max-w-5xl my-0 mx-auto'>
				{loading || isEventLoading ? (
					<div className='flex justify-center'>
						<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
					</div>
				) : (
					<>
						<h1 className='text-4xl font-bold text-white text-center'>Edit your event</h1>
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
									value={eventType}
									setValue={setEventType}
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

								{eventType === 'Offline' ? (
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
									className='sm:col-span-2 h-10'
								/>
								<Input
									label='Free spots'
									placeholder='Free spots'
									id='freePlaces'
									autoComplete='off'
									type='number'
									register={register('freePlaces', { required: true, valueAsNumber: true })}
									errors={errors}
									className='sm:col-span-2 h-10'
								/>
							</div>
						</div>
						<div className='pt-5 text-center sm:col-span-2'>
							<p className='text-red-600'>{errorMessage}</p>
							<Button className='w-full' type='submit'>
								Update Event
							</Button>
						</div>
					</>
				)}
			</div>
		</form>
	);
};

export default EditEventPage;

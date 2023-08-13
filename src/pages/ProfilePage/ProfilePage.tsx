import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../components/UI/Input/Input';
import { inputClasses } from '../../utils/styles';
import { useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import { useFetching } from '../../hooks/useFetching';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ErrorTitle from '../../components/ErrorTitle/ErrorTitle';
import { SpinnerCircular } from 'spinners-react';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../services/userActions';
import { useSubmiting } from '../../hooks/useSubmiting';
import { useCountries } from '../../hooks/useCountries';
import { IUser } from '../../types/types';

const ProfilePage = () => {
	const { userData } = useAuth();
	const countries = useCountries();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IUser>();
	const {
		fetching: fetchUser,
		isLoading,
		error,
	} = useFetching(async () => {
		if (userData.id) {
			const docRef = doc(db, 'users', userData.id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setValue('name', docSnap.data().name);
				setValue('about', docSnap.data().about);
				setValue('firstName', docSnap.data().firstName);
				setValue('lastName', docSnap.data().lastName);
				setValue('email', docSnap.data().email);
				setValue('country', docSnap.data().country);
				setValue('street', docSnap.data().street);
				setValue('city', docSnap.data().city);
				setValue('state', docSnap.data().state);
				setValue('zip', docSnap.data().zip);
				setValue('notifications', docSnap.data().notifications);
			}
		}
	});

	const { submitting, isSubmitting } = useSubmiting(async (data: IUser) => {
		if (userData.id) {
			await updateUser(data, userData.id);
			fetchUser();
		}
	});

	const onSubmit: SubmitHandler<IUser> = async (data) => {
		submitting(data);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	if (error) {
		return (
			<div className='p-10 max-w-5xl my-0 mx-auto'>
				<ErrorTitle>Something went wrong😕</ErrorTitle>
			</div>
		);
	}

	if (isLoading || isSubmitting) {
		return (
			<div className='p-10 max-w-5xl my-0 mx-auto'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='p-10 max-w-5xl my-0 mx-auto'>
				<div className='border-b border-white/30 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-white'>Profile</h2>
					<p className='mt-1 text-sm leading-6 text-gray-400'>
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<Input
							label='Username'
							id='name'
							autoComplete='name'
							placeholder='Your name'
							register={register('name')}
							errors={errors}
							className='sm:col-span-3'
						/>

						<div className='col-span-full'>
							<label htmlFor='about' className='block text-sm font-medium leading-6 text-white'>
								About
							</label>
							<div className='mt-2'>
								<textarea id='about' rows={3} className={inputClasses} {...register('about')} />
							</div>
							<p className='mt-3 text-sm leading-6 text-gray-400'>
								Write a few sentences about yourself.
							</p>
						</div>

						<div className='col-span-full'>
							<label htmlFor='photo' className='block text-sm font-medium leading-6 text-white'>
								Photo
							</label>
							<div className='mt-2 flex items-center gap-x-3'>
								<UserCircleIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />
								<button
									type='button'
									className='rounded-md bg-white/5px-2.5 py-1.5 px-2 text-sm font-semibold text-white shadow-sm ring-inset ring-1 ring-indigo-500'
								>
									Change
								</button>
							</div>
						</div>

						<div className='col-span-full'>
							<label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-white'>
								Cover photo
							</label>
							<div className='mt-2 flex justify-center rounded-lg border border-dashed border-white/50 px-6 py-10'>
								<div className='text-center'>
									<PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
									<div className='mt-4 flex text-sm leading-6 text-gray-400'>
										<label
											htmlFor='file-upload'
											className='relative cursor-pointer rounded-md  font-semibold text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-offset-2 hover:text-indigo-300'
										>
											<span>Upload a file</span>
											<input
												id='file-upload'
												name='file-upload'
												type='file'
												className='sr-only'
											/>
										</label>
										<p className='pl-1'>or drag and drop</p>
									</div>
									<p className='text-xs leading-5 text-gray-400'>PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='border-b border-white/30 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-white'>Personal Information</h2>
					<p className='mt-1 text-sm leading-6 text-gray-400'>
						Use a permanent address where you can receive mail.
					</p>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<Input
							label='First name'
							placeholder='First name'
							id='firstName'
							autoComplete='name'
							register={register('firstName')}
							errors={errors}
							className='sm:col-span-3'
						/>
						<Input
							label='Last name'
							placeholder='Last name'
							id='lastName'
							autoComplete='name'
							register={register('lastName')}
							errors={errors}
							className='sm:col-span-3'
						/>
						<Input
							type='email'
							label='Email address'
							placeholder='Email address'
							id='email'
							autoComplete='email'
							register={register('email')}
							errors={errors}
							className='sm:col-span-4'
						/>

						<div className='sm:col-span-3'>
							<label htmlFor='country' className='block text-sm font-medium leading-6 text-white'>
								Country
							</label>
							<div className='mt-2'>
								<select
									id='country'
									autoComplete='country-name'
									className={inputClasses}
									{...register('country')}
								>
									<option className='bg-gray-600'>Select a country</option>
									{countries.map((country) => (
										<option key={country} className='bg-gray-600'>
											{country}
										</option>
									))}
								</select>
							</div>
						</div>
						<Input
							label='Street address'
							placeholder='Street address'
							id='street'
							autoComplete='street'
							register={register('street')}
							errors={errors}
							className='col-span-full'
						/>
						<Input
							label='City'
							placeholder='City'
							id='city'
							autoComplete='city'
							register={register('city')}
							errors={errors}
							className='sm:col-span-2 sm:col-start-1'
						/>
						<Input
							label='State / Province'
							placeholder='State / Province'
							id='state'
							autoComplete='state'
							register={register('state')}
							errors={errors}
							className='sm:col-span-2'
						/>
						<Input
							label='ZIP / Postal code'
							placeholder='ZIP / Postal code'
							id='zip'
							autoComplete='zip'
							register={register('zip')}
							errors={errors}
							className='sm:col-span-2'
						/>
					</div>
				</div>

				<div className='border-b border-white/30 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-white'>Notifications</h2>

					<div className='mt-4 space-y-10'>
						<div className='relative flex gap-x-3'>
							<div className='flex h-6 items-center'>
								<input
									id='notifications'
									type='checkbox'
									className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
									{...register('notifications')}
								/>
							</div>
							<div className='text-sm leading-6'>
								<label htmlFor='notifications' className='font-medium text-white'>
									By Email
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-5 text-center sm:col-span-2'>
					<Button className='w-full' type='submit'>
						Save
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ProfilePage;

import Button from '../../components/UI/Button/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { SpinnerCircular } from 'spinners-react';
import Input from '../../components/UI/Input/Input';
import { setUser } from '../../features/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { useSubmiting } from '../../hooks/useSubmiting';
import { createUser, getUser } from '../../services/userActions';

type FormData = {
	name: string;
	email: string;
	pwd: string;
	userType: string;
};

const inputClasses =
	'w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none';

const SignUpPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({ mode: 'onChange' });

	const { submitting, isSubmitting, error } = useSubmiting(async (data: FormData) => {
		if ((await createUser(data)) === 'User already exists') {
			setErrorMessage('User already exists');
			return;
		}

		const authUser = await getUser(data.email, data.pwd);
		if (authUser) {
			dispatch(
				setUser({
					id: authUser.id,
					name: data.name,
					email: data.email,
					userType: data.userType,
				})
			);
		}

		reset();
		setErrorMessage('');
		navigate('/');
	});

	const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		submitting(data);
		if (error) setErrorMessage(error);
	};
	return (
		<div className='flex justify-center items-center flex-col'>
			{isSubmitting ? (
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col pt-8 gap-3 w-96'>
					<h1 className='text-3xl font-bold text-center'>Create new account</h1>
					<p className='text-red-500 py-2'>{errorMessage}</p>
					<Input
						id='name'
						label='Name'
						errors={errors}
						autoComplete='name'
						placeholder='Your Name'
						register={register('name', {
							required: '*This field is required',
							pattern: {
								value: /^[A-Za-z]+$/i,
								message: '*Please enter a valid name',
							},
						})}
					/>
					<Input
						id='email'
						type='email'
						label='Email'
						errors={errors}
						autoComplete='email'
						placeholder='Your Email'
						register={register('email', {
							required: '*This field is required',
							pattern: {
								value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: '*Please enter a valid email address',
							},
						})}
					/>
					<Input
						id='pwd'
						type='password'
						label='Password'
						errors={errors}
						autoComplete='password'
						placeholder='Your Password'
						register={register('pwd', {
							required: '*This field is required',
							pattern: {
								value: /^\S*$/,
								message: '*Password cannot contain spaces',
							},
							minLength: {
								value: 6,
								message: '*Password must be at least 6 characters long',
							},
						})}
					/>
					<div className='flex flex-col gap-2'>
						<label htmlFor='user-type'>Account Type</label>
						<select id='user-type' {...register('userType')} className={inputClasses}>
							<option value='customer' className='bg-gray-700'>
								Customer
							</option>
							<option value='creator' className='bg-gray-700'>
								Creator
							</option>
						</select>
					</div>

					<Button disabled={!isValid} className='mt-3' type='submit'>
						Sign Up
					</Button>
				</form>
			)}
		</div>
	);
};

export default SignUpPage;

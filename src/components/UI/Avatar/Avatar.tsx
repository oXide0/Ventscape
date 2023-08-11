import { memo, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { removeUser } from '../../../features/userSlice';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';

const Avatar = memo(() => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const signOut = () => {
		dispatch(removeUser());
		navigate('/');
	};

	return (
		<Menu as='div' className='relative ml-3'>
			<div>
				<Menu.Button
					className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
					data-testid='avatar-button'
				>
					<UserCircleIcon className='h-8 w-8 text-gray-300' aria-hidden='true' data-testid='icon' />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<MenuItem path='/profile'>Your Profile</MenuItem>
					<MenuItem path='/settings'>Settings</MenuItem>
					<MenuItem variant='button' onClick={signOut}>
						Sign out
					</MenuItem>
				</Menu.Items>
			</Transition>
		</Menu>
	);
});

export default Avatar;

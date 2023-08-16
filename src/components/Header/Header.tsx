import { memo } from 'react';
import Button from '../UI/Button/Button';
import { GoSearch } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Avatar from '../UI/Avatar/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { AiOutlineHeart } from 'react-icons/ai';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectFavoriteEvents } from '../../features/eventSlice';
import { useAvatar } from '../../hooks/useAvatar';

const Header = memo(() => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const { isAuth, userData } = useAuth();
	const avatarUrl = useAvatar();

	return (
		<header className='flex justify-between relative z-50 px-10 py-6 max-lg:gap-10'>
			<div className='flex w-96'>
				<input
					type='text'
					placeholder='Search...'
					className='bg-white/10 px-4 h-10 outline-none w-full rounded-l-lg'
				/>
				<button className='font-bold px-4 py-1 rounded-r-md duration-100 bg-indigo-500 hover:bg-indigo-700 active:scale-95'>
					<GoSearch size='1.5em' />
				</button>
			</div>
			{isAuth ? (
				<div className='flex gap-8 items-center'>
					<Link to='/events/favorite' className='relative'>
						<AiOutlineHeart size='1.7em' />
						<span className='absolute -top-1 -right-1 text-xs font-bold bg-red-500 text-white rounded-full px-1'>
							{favoriteEvents.length}
						</span>
					</Link>
					<div className='flex items-center'>
						<p className='font-bold'>{userData?.name}</p>
						<Avatar avatarUrl={avatarUrl} />
					</div>
				</div>
			) : (
				<div className='flex gap-5'>
					<Link
						to='signup'
						className='font-bold px-4 py-1 rounded-md hover:bg-white/20 flex justify-center items-center duration-100'
					>
						Sign Up
					</Link>
					<Link to='/login'>
						<Button>Login</Button>
					</Link>
				</div>
			)}
		</header>
	);
});

export default Header;

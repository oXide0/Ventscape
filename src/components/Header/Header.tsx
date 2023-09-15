import { memo } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useAvatar } from 'hooks/useAvatar';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks/redux-hooks';
import { removeAllFavorites, selectFavoriteEvents } from 'features/eventSlice';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from 'UI/Button/Button';
import Avatar from 'UI/Avatar/Avatar';
import SearchBar from 'UI/SearchBar/SearchBar';
import { removeUser } from 'features/userSlice';

const Header = memo(() => {
	const favoriteEvents = useAppSelector(selectFavoriteEvents);
	const { isAuth, userData } = useAuth();
	const avatarUrl = useAvatar();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const signOut = () => {
		dispatch(removeUser());
		dispatch(removeAllFavorites());
		navigate('/');
	};

	return (
		<header className='flex justify-between relative z-50 px-10 py-5 max-lg:gap-10'>
			<div className='w-2/4 relative'>
				<SearchBar />
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
						<Avatar avatarUrl={avatarUrl} signOut={signOut} />
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

import { memo, useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux-hooks';
import { HiStatusOnline } from 'react-icons/hi';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { getEventImg } from 'utils/events';
import { formatDate } from 'utils/date';
import { Link } from 'react-router-dom';
import { CardProps } from './index';
import EventEditCard from './EventEditCard';
import { addEeventToFavorites, removeEventFromFavorites } from 'services/userActions';
import { addFavorite, removeFavorite } from 'features/eventSlice';

const cardClasses = 'w-full h-56 bg-indigo-600 rounded-md flex';

const EventCard = memo((props: CardProps) => {
	const dispatch = useAppDispatch();
	const [isLiked, setIsLiked] = useState<boolean | null>(null);
	const { isAuth, userData } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (props.variant === 'default') {
			setIsLiked(props.isLiked);
		}
	}, []);

	if (props.variant === 'edit') {
		return <EventEditCard {...props} />;
	}

	const toggleLike = async () => {
		if (!isAuth) {
			navigate('/signup');
			return;
		}
		if (userData.id) {
			if (isLiked) {
				setIsLiked(false);
				removeEventFromFavorites(userData.id, props.id);
				dispatch(removeFavorite(props.id));
			} else {
				setIsLiked(true);
				addEeventToFavorites(userData.id, props.id);
				dispatch(addFavorite(props.id));
			}
		}
	};

	return (
		<div className={props.freePlaces === 0 ? `${cardClasses} opacity-40` : cardClasses}>
			<img src={getEventImg(props.category)} alt={props.category} className='rounded-l-md h-full' />
			<div className='px-16 py-8 w-full flex flex-col justify-between'>
				<div className='flex justify-between'>
					<h1 className='text-4xl font-semibold'>{props.name}</h1>
					<div className='flex gap-6'>
						<button onClick={toggleLike} data-testid='like-button'>
							{isLiked ? (
								<AiFillHeart data-testid='active-like' className='text-white' size='1.5em' />
							) : (
								<AiOutlineHeart className='text-white' size='1.5em' />
							)}
						</button>
						<Link
							to={`/events/${props.id}`}
							className='bg-white text-indigo-600 font-semibold px-10 py-3 rounded-md duration-100 active:scale-95 hover:bg-indigo-800 hover:text-white'
						>
							Show
						</Link>
					</div>
				</div>
				<div className='flex'>
					{props.mode === 'Offline' ? (
						<div className='flex gap-2 w-60'>
							<FaLocationDot size='3em' />
							<div className='flex flex-col justify-between'>
								<p>Location</p>
								<p className='text-xl font-semibold'>{`${props.city}, ${props.country}`}</p>
							</div>
						</div>
					) : (
						<div className='flex gap-2 w-60'>
							<HiStatusOnline size='3em' />
							<div>
								<p>Type</p>
								<p className='text-xl font-semibold'>Online</p>
							</div>
						</div>
					)}
					<div className='flex gap-2'>
						<BiTime size='3em' />
						<div>
							<p>Date</p>
							<p className='text-xl font-semibold'>{formatDate(props.date)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default EventCard;

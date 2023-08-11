import { HiStatusOnline } from 'react-icons/hi';
import { getEventImg } from '../../utils/events';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { memo } from 'react';
import { formatDate } from '../../utils/date';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { addFavorite, removeFavorite } from '../../features/eventSlice';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLiked } from '../../hooks/useLiked';
import { CardProps } from './index';
import EventEditCard from './EventEditCard';

const EventCard = memo((props: CardProps) => {
	const { isAuth } = useAuth();
	const { isLiked, setIsLiked } = useLiked(props.id);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const toggleLike = () => {
		if (!isAuth) {
			navigate('/signup');
			return;
		}
		if (!isLiked) {
			dispatch(addFavorite(props.id));
			setIsLiked(true);
		} else {
			dispatch(removeFavorite(props.id));
			setIsLiked(false);
		}
	};

	if (props.variant === 'edit') {
		return <EventEditCard {...props} />;
	}

	return (
		<div className='w-365'>
			<div className='relative'>
				<img src={getEventImg(props.type)} alt={props.type} className='h-56 w-full object-cover rounded' />
				<div className='absolute bg-black/60 px-4 py-2 bottom-0 flex justify-between w-full'>
					{props.kind === 'Offline' ? (
						<div className='flex gap-2'>
							<FaLocationDot className='text-indigo-600' size='1.5em' />
							<p>{`${props.city}, ${props.country}`}</p>
						</div>
					) : (
						<div className='flex gap-2'>
							<HiStatusOnline className='text-indigo-600' size='1.5em' />
							<p>Online</p>
						</div>
					)}

					<div className='px-2 bg-indigo-600 rounded-xl'>
						<p>{!props.price ? 'Free' : props.price}</p>
					</div>
				</div>
			</div>
			<div className='bg-gray-100 py-2 px-4 rounded'>
				<div className='flex justify-between'>
					<div className='flex gap-2'>
						<BiTime className='text-indigo-600' size='1.5em' />
						<p className='text-gray-800 font-semibold'>{formatDate(props.date)}</p>
					</div>
					<div>
						<button onClick={toggleLike}>
							{isLiked ? (
								<AiFillHeart className='text-indigo-600' size='1.5em' />
							) : (
								<AiOutlineHeart className='text-indigo-600' size='1.5em' />
							)}
						</button>
					</div>
				</div>
				<div className='pt-1'>
					<h2 className='text-gray-800 text-xl font-semibold'>{props.name}</h2>
					<p className='text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden'>{props.about}</p>
				</div>
				<div className='pt-3 flex justify-between'>
					<span className='inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10'>
						#{props.type}
					</span>
					<Link
						to={`/events/${props.id}`}
						className='bg-indigo-600 px-4 py-1 rounded-md duration-100 hover:bg-indigo-800 active:scale-95'
					>
						Learn More
					</Link>
				</div>
			</div>
		</div>
	);
});

export default EventCard;

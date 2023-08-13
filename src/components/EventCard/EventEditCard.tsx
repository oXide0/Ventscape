import { memo } from 'react';
import { CardProps } from './index';
import { formatDate } from '../../utils/date';
import { BiTime } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EventEditCard = memo((props: CardProps) => {
	if (props.variant !== 'edit') return null;
	return (
		<div className='w-360'>
			<div className='bg-gray-100 py-2 px-4 rounded'>
				<div className='flex justify-between'>
					<div className='flex gap-2'>
						<BiTime className='text-indigo-600' size='1.5em' />
						<p className='text-gray-800 font-semibold'>{formatDate(props.date)}</p>
					</div>
				</div>
				<div className='pt-1'>
					<h2 className='text-gray-800 text-xl font-semibold'>{props.name}</h2>
					<p className='text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden'>{props.about}</p>
				</div>
				<div className='pt-3 flex justify-between'>
					<Link
						className='bg-indigo-600 px-4 py-1 rounded-md duration-100 hover:bg-indigo-800 active:scale-95 flex items-center gap-3'
						to={`/events/edit/${props.id}`}
					>
						<MdEdit />
						Edit
					</Link>
					<button
						className='bg-indigo-600 px-4 py-1 rounded-md duration-100 hover:bg-indigo-800 active:scale-95 flex items-center gap-1'
						onClick={() => props.onRemoveEvent(props.id)}
					>
						<MdDelete />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
});

export default EventEditCard;

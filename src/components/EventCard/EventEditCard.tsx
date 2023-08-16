import { memo, useState } from 'react';
import { CardProps } from './index';
import { formatDate } from '../../utils/date';
import { BiTime } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import Modal from '../Modal/Modal';

const EventEditCard = memo((props: CardProps) => {
	const [modalActive, setModalActive] = useState<boolean>(false);

	if (props.variant !== 'edit') return null;
	return (
		<div className='w-360'>
			<Modal active={modalActive} setActive={setModalActive}>
				<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
					<div className='sm:flex sm:items-start'>
						<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
							<ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
						</div>
						<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
							<Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
								Delete event
							</Dialog.Title>
							<div className='mt-2'>
								<p className='text-sm text-gray-500'>
									Are you sure you want to delete your event? This action cannot be undone.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
					<button
						type='button'
						className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
						onClick={() => props.onRemoveEvent(props.id)}
					>
						Delete
					</button>
					<button
						type='button'
						className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
						onClick={() => setModalActive(false)}
					>
						Cancel
					</button>
				</div>
			</Modal>
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
						onClick={() => setModalActive(true)}
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

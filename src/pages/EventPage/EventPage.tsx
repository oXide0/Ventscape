import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IEvent } from '../../types/types';
import { useFetching } from '../../hooks/useFetching';
import { db } from '../../config/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SpinnerCircular } from 'spinners-react';
import { formatDate } from '../../utils/date';
import Button from '../../components/UI/Button/Button';
import { HiStatusOnline } from 'react-icons/hi';
import { FaLocationDot } from 'react-icons/fa6';
import { BiTime } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { VscSymbolEvent } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { useAuth } from '../../hooks/useAuth';

const EventPage = () => {
	const [isApplied, setIsApplied] = useState(false);
	const { userType, userData } = useAuth();
	const { id } = useParams();
	const [event, setEvent] = useState<IEvent>();
	const { fetching, isLoading, error } = useFetching(async () => {
		if (id) {
			const docRef = doc(db, 'events', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setEvent(docSnap.data() as IEvent);
				if (docSnap.data().appliedUsers.includes(userData.id)) {
					setIsApplied(true);
				}
			}
		}
	});

	const onApply = async () => {
		setIsApplied(true);
		if (event && id) {
			try {
				const docRef = doc(db, 'events', id);
				await updateDoc(docRef, {
					freePlaces: event.freePlaces - 1,
					appliedUsers: [...event.appliedUsers, userData.id],
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const onUnApply = async () => {
		setIsApplied(false);
		if (event && id) {
			try {
				const docRef = doc(db, 'events', id);
				await updateDoc(docRef, {
					freePlaces: event.freePlaces + 1,
					appliedUsers: event.appliedUsers.filter((userId) => userId !== userData.id),
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetching();
	}, [isApplied]);

	if (error || !id) {
		return <NotFoundPage />;
	}

	if (isLoading || !event) {
		return (
			<div className='flex justify-center'>
				<SpinnerCircular className='pt-40' color='rgb(67 56 202)' />
			</div>
		);
	}

	return (
		<IconContext.Provider value={{ color: 'rgb(99 102 241)', size: '1.5em' }}>
			<div className='w-full p-10'>
				<h1 className='text-4xl font-bold'>{event.name}</h1>
				<div className='pt-6 flex flex-col gap-3'>
					{event.kind === 'Offline' ? (
						<div className='text-lg text-gray-300 flex items-end gap-2'>
							<p className='flex items-center gap-2'>
								<FaLocationDot />
								<span className='text-xl text-white font-semibold'>Location:</span>
							</p>
							{` ${event.country}, ${event.city}, ${event.street}`}
						</div>
					) : (
						<p className='text-lg text-gray-300 flex items-center gap-2'>
							<HiStatusOnline />
							<span className='text-xl text-white font-semibold'>Online</span>
						</p>
					)}
					<p className='text-lg text-gray-300 flex items-end gap-2'>
						<BiTime />
						<span className='text-white font-semibold'>Date:</span> {formatDate(event.date)}
					</p>
					<p className='text-lg text-gray-300 flex items-end gap-2'>
						<BsFillPersonFill />
						<span className='text-white font-semibold'>Free places: </span> {event.freePlaces}
					</p>
					<p className='text-lg text-gray-300 flex items-end gap-2'>
						<VscSymbolEvent />
						<span className='text-white font-semibold'>Type: </span> {event.type}
					</p>
					<h2 className='text-xl font-bold pt-4'>About</h2>
					<p>{event.about}</p>
				</div>
				{userType === 'customer' && (
					<div className='pt-6 flex gap-5'>
						{isApplied ? (
							<button
								className='font-bold px-6 py-2 rounded-md bg-gray-200/10 duration-100 active:scale-95 hover:bg-gray-500'
								onClick={onUnApply}
							>
								Cancel application
							</button>
						) : (
							<Button onClick={onApply}>Apply</Button>
						)}
					</div>
				)}
			</div>
		</IconContext.Provider>
	);
};

export default EventPage;

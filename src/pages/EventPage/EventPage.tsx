import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IEvent } from '../../types/types';
import { useFetching } from '../../hooks/useFetching';
import { db } from '../../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { SpinnerCircular } from 'spinners-react';
import { formatDate } from '../../utils/date';
import Button from '../../components/UI/Button/Button';
import { HiStatusOnline } from 'react-icons/hi';
import { FaLocationDot } from 'react-icons/fa6';
import { BiTime } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiMoneyEuroCircleLine } from 'react-icons/ri';
import { VscSymbolEvent } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { useAuth } from '../../hooks/useAuth';
import { applyForEvent, unApplyForEvent } from '../../services/eventActions';
import InfoSnippet from '../../components/InfoSnippet/InfoSnippet';

const EventPage = () => {
	const { userType, userData } = useAuth();
	const { id } = useParams();
	const [isApplied, setIsApplied] = useState(false);
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
		applyForEvent(event, id, userData.id);
		setIsApplied(true);
	};

	const onUnApply = async () => {
		unApplyForEvent(event, id, userData.id);
		setIsApplied(false);
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
					{event.mode === 'Offline' ? (
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
					<InfoSnippet title='Date:' content={formatDate(event.date)} icon={<BiTime />} />
					<InfoSnippet
						title='Price:'
						content={event.price ? event.price + ' ' + event.currency : 'Free'}
						icon={<RiMoneyEuroCircleLine />}
					/>
					<InfoSnippet title='Free places:' content={event.freePlaces} icon={<BsFillPersonFill />} />
					<InfoSnippet title='Type:' content={event.category} icon={<VscSymbolEvent />} />
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

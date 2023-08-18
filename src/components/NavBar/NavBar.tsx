import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import CustomLink from '../UI/CustomLink/CustomLink';
import { useAuth } from '../../hooks/useAuth';

const NavBar = memo(() => {
	const { userType } = useAuth();

	return (
		<IconContext.Provider value={{ size: '1.7em' }}>
			<div className='bg-slate-900 p-5 h-full w-80 fixed z-10 max-lg:w-24 max-lg:flex max-lg:flex-col max-lg:items-center'>
				<Link to='/' className='text-2xl font-bold max-lg:hidden'>
					VENTSCAPE
				</Link>
				<div className='pt-10'>
					<p className='opacity-60 max-lg:hidden'>Navigation</p>
					{userType === 'creator' ? (
						<nav className='flex flex-col gap-5 pt-5'>
							<CustomLink to='/' name='home'>
								<span className='text-md max-lg:hidden'>Home</span>
							</CustomLink>
							<CustomLink to='/events' name='events'>
								<span className='text-md max-lg:hidden'>Events</span>
							</CustomLink>
							<CustomLink to='/notifications' name='notifications'>
								<span className='text-md max-lg:hidden'>Notifications</span>
							</CustomLink>
							<CustomLink to='/events/create' name='add-event'>
								<span className='text-md max-lg:hidden'>Add event</span>
							</CustomLink>
							<CustomLink to='/events/my' name='my-events'>
								<span className='text-md max-lg:hidden'>My events</span>
							</CustomLink>
							<CustomLink to='/test' name='stats'>
								<span className='text-md max-lg:hidden'>Statistics</span>
							</CustomLink>
						</nav>
					) : (
						<nav className='flex flex-col gap-5 pt-5'>
							<CustomLink to='/' name='home'>
								<span className='text-md max-lg:hidden'>Home</span>
							</CustomLink>
							<CustomLink to='/events' name='events'>
								<span className='text-md max-lg:hidden'>Events</span>
							</CustomLink>
							<CustomLink to='/notifications' name='notifications'>
								<span className='text-md max-lg:hidden'>Notifications</span>
							</CustomLink>
						</nav>
					)}
				</div>
			</div>
		</IconContext.Provider>
	);
});

export default NavBar;

import { Outlet } from 'react-router-dom';
import NavBar from 'components/NavBar/NavBar';
import Header from 'components/Header/Header';
// import Banner from './Banner/Banner';

const Layout = () => {
	return (
		<div className='flex h-screen'>
			<NavBar />
			<div className='flex flex-col pl-80 w-full max-lg:pl-24'>
				{/* <Banner /> */}
				<Header />
				<div className='border-gray-500 border'></div>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;

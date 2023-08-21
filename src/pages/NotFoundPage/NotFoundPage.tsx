import { Link } from 'react-router-dom';
import Button from 'components/UI/Button/Button';

const NotFoundPage = () => {
	return (
		<main className='grid h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-base font-semibold text-indigo-400'>404</p>
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>Page not found</h1>
				<p className='mt-6 text-base leading-7 text-gray-300'>
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Link to='/'>
						<Button>Go back home</Button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;

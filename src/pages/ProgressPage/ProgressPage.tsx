import { Link } from 'react-router-dom';
import Button from 'components/UI/Button/Button';
import { SpinnerInfinity } from 'spinners-react';

const ProgressPage = () => {
	return (
		<main className='grid h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<div className='flex justify-center'>
					<SpinnerInfinity size='5em' color='rgb(67 56 202)' secondaryColor='rgb(15 23 42)' />
				</div>
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
					Page is under development
				</h1>
				<p className='mt-6 text-base leading-7 text-gray-300'>
					This page is currently not ready and under development
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

export default ProgressPage;

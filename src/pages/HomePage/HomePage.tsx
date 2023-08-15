import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
	const { isAuth } = useAuth();

	return (
		<div className='bg-gray-800'>
			<div className='relative isolate pt-14 px-6 lg:px-8'>
				<div
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
					aria-hidden='true'
				>
					<div
						className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
				<div className='mx-auto max-w-3xl py-0 sm:py-48 lg:py-0'>
					<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
						<div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-100/10 hover:ring-gray-100/40'>
							<Link
								to='https://github.com/oXide0/Virtual-Event-Platform'
								className='flex gap-1 items-center'
								target='_blank'
							>
								<span>See the project on github</span>
								<AiFillGithub size='1.5em' />
							</Link>
						</div>
					</div>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl flex flex-col'>
							<span data-testid='test-text'>Meet a new one</span>
							<span>Event Platform - Ventscape</span>
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-400'>
							Introducing my innovative Ventscape – an immersive and seamless online experience that
							connects you with a world of dynamic events, networking opportunities, and interactive
							content, right from the comfort of your own space. Elevate your event participation to new
							heights and embrace a whole new dimension of engagement.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<Link to={isAuth ? '/events' : 'signup'}>
								<Button>Get started</Button>
							</Link>

							<Link to='/' className='text-sm font-semibold leading-6 text-white'>
								Learn more <span aria-hidden='true'>→</span>
							</Link>
						</div>
					</div>
				</div>
				<div
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
					aria-hidden='true'
				>
					<div
						className='relative left-[calc(50%+3rem)] aspect-[1155/600] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

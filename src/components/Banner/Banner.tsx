import { memo } from 'react';
import { Link } from 'react-router-dom';

const Banner = memo(() => {
	return (
		<div className='relative flex justify-center items-center isolate overflow-hidden bg-gray-700 py-2 sm:px-3.5'>
			<div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
				<p className='text-lg leading-6 text-white font-bold'>
					Support Ukraine 🇺🇦{' '}
					<Link
						to='https://opensource.fb.com/support-ukraine'
						className='underline text-indigo-300'
						target='_blank'
					>
						Help Provide Humanitarian Aid to Ukraine.
					</Link>
				</p>
			</div>
		</div>
	);
});

export default Banner;

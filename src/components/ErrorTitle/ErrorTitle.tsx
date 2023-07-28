import { memo } from 'react';

interface ErrorTitleProps {
	children: string;
	className?: string;
}

const ErrorTitle = memo(({ children, className = '' }: ErrorTitleProps) => {
	return (
		<div className='flex justify-center pt-20'>
			<h1 className={'text-5xl text-white font-bold' + className}>{children}</h1>
		</div>
	);
});

export default ErrorTitle;

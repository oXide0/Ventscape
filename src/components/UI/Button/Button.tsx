import { memo } from 'react';

export interface ButtonProps {
	children: string;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
}

const buttonClasses = 'font-bold px-6 py-2 rounded-md bg-indigo-500 duration-100 active:scale-95';

const Button = memo(({ children, disabled, onClick, className, type }: ButtonProps) => {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
			className={
				disabled
					? `${buttonClasses} opacity-20 ${className}`
					: `${buttonClasses} hover:bg-indigo-700 ${className}`
			}
		>
			{children}
		</button>
	);
});

export default Button;

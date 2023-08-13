import { memo } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
	disabled?: boolean;
	className?: string;
}

const buttonClasses = 'font-bold px-6 py-2 rounded-md bg-indigo-500 duration-100 active:scale-95';

const Button = memo((props: ButtonProps) => {
	const { children, className, disabled, ...restProps } = props;

	return (
		<button
			{...restProps}
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

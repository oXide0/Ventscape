import { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
	disabled?: boolean;
	className?: string;
	variant?: 'primary' | 'secondary';
}

const primaryButton = 'font-bold px-6 py-2 rounded-md bg-indigo-500 duration-100 active:scale-95';
const secondaryButton = 'font-bold px-6 py-2 rounded-md bg-gray-500 duration-100 active:scale-95';
// Write variants of the button
const Button = memo((props: ButtonProps) => {
	const { children, className, disabled, ...restProps } = props;

	return (
		<button
			{...restProps}
			disabled={disabled}
			className={
				disabled
					? `${props.variant === 'secondary' ? secondaryButton : primaryButton} opacity-20 ${className}`
					: props.variant === 'secondary'
					? `${secondaryButton} hover:bg-gray-600 ${className}`
					: `${primaryButton} hover:bg-indigo-700 ${className}`
			}
		>
			{children}
		</button>
	);
});

export default Button;

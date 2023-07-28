import { memo } from 'react';
import { inputClasses } from '../../../utils/styles';

interface InputProps {
	type?: string;
	label: string;
	placeholder: string;
	id: string;
	autoComplete: string;
	register: any;
	errors: any;
	className?: string;
}

const Input = memo(
	({ type = 'text', label, placeholder, id, autoComplete, register, errors, className }: InputProps) => {
		return (
			<div className={`flex flex-col gap-2 ${className}`}>
				<div className='flex justify-between'>
					<label htmlFor={id} className='block text-sm font-medium leading-6 text-white'>
						{label}
					</label>
					<label className='text-red-500'>{errors?.[id] && errors?.[id].message}</label>
				</div>
				<input
					type={type}
					placeholder={placeholder}
					id={id}
					autoComplete={autoComplete}
					{...register}
					className={inputClasses}
				/>
			</div>
		);
	}
);

export default Input;

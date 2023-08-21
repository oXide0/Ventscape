import { memo } from 'react';
import { inputClasses } from 'utils/styles';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	id: string;
	label: string;
	register: UseFormRegisterReturn;
	options: string[];
	width?: string;
}

const Select = memo((props: SelectProps) => {
	const { id, label, register, options, width = 'sm:col-span-3', ...restProps } = props;

	return (
		<div className={width}>
			<label htmlFor={id} className='block text-sm font-medium leading-6 text-white'>
				{label}
			</label>
			<div className='mt-2'>
				<select id={id} className={inputClasses} {...restProps} {...register}>
					{options.map((option) => (
						<option key={option} value={option} className='bg-gray-600'>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
});

export default Select;

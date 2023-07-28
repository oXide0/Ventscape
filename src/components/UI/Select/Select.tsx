import { memo } from 'react';
import { inputClasses } from '../../../utils/styles';

interface SelectProps {
	id: string;
	label: string;
	value?: string;
	defaultValue?: string;
	setValue?: (value: string) => void;
	register: any;
	options: string[];
	width?: string;
}

const Select = memo(({ id, label, value, setValue, register, options, width = 'sm:col-span-3' }: SelectProps) => {
	return (
		<div className={width}>
			<label htmlFor={id} className='block text-sm font-medium leading-6 text-white'>
				{label}
			</label>
			<div className='mt-2'>
				<select
					id={id}
					autoComplete='off'
					className={inputClasses}
					{...register}
					value={value}
					onChange={setValue ? (e) => setValue(e.target.value) : undefined}
				>
					{options.map((option) => (
						<option key={option} className='bg-gray-600'>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
});

export default Select;

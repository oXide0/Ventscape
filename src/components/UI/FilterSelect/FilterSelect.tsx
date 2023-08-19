import { memo } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FilterSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	title: string;
	register: UseFormRegisterReturn;
	options: string[];
}

const FilterSelect = memo((props: FilterSelectProps) => {
	const { options, title, register, ...restProps } = props;

	return (
		<div className='relative inline-block w-40'>
			<select
				className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
				data-testid={title}
				defaultValue={title}
				{...register}
				{...restProps}
			>
				<option disabled value={title}>
					{title}
				</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
				<BiSolidDownArrow size='0.9em' />
			</div>
		</div>
	);
});

export default FilterSelect;

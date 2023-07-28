import { memo } from 'react';

interface ToggleButtonProps {
	value1: string;
	value2: string;
	activeValue: number;
	setActiveValue: (value: number) => void;
}

const ToggleButton = memo(({ value1, value2, activeValue, setActiveValue }: ToggleButtonProps) => {
	return (
		<div className='flex border-2 border-gray-600 rounded-md w-28 justify-between'>
			<button
				className={activeValue === 1 ? 'bg-white/10 w-1/2 p-1' : 'w-1/2 p-1'}
				onClick={() => setActiveValue(1)}
				type='button'
			>
				{value1}
			</button>
			<div className='border border-gray-400'></div>
			<button
				className={activeValue === 2 ? 'bg-white/10 w-1/2 p-1' : 'w-1/2 p-1'}
				onClick={() => setActiveValue(2)}
				type='button'
			>
				{value2}
			</button>
		</div>
	);
});

export default ToggleButton;

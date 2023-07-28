import { render, fireEvent } from '@testing-library/react';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
	test('renders ToggleButton without errors', () => {
		render(<ToggleButton value1='Value 1' value2='Value 2' activeValue={1} setActiveValue={() => {}} />);
	});
	test('displays correct values and active button', () => {
		const { getByText } = render(
			<ToggleButton value1='Value 1' value2='Value 2' activeValue={1} setActiveValue={() => {}} />
		);

		const button1 = getByText('Value 1');
		const button2 = getByText('Value 2');

		fireEvent.click(button1);

		expect(button1).toBeInTheDocument();
		expect(button2).toBeInTheDocument();

		expect(button1).toHaveClass('bg-white/10 w-1/2 p-1');
		expect(button2).toHaveClass('w-1/2 p-1');
	});
});

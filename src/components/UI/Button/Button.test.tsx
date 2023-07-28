import { render } from '@testing-library/react';
import Button from './Button';
import { vi } from 'vitest';

describe('Button', () => {
	it('renders button with text', () => {
		const { getByText } = render(<Button>Test</Button>);
		const buttonElement = getByText(/Test/);
		expect(buttonElement).toBeInTheDocument();
	});
	it('renders button with text and custom class', () => {
		const { getByText } = render(<Button className='main__btn'>Test</Button>);
		const buttonElement = getByText(/Test/);
		expect(buttonElement).toHaveClass('main__btn');
	});
	it('renders button with text and disabled', () => {
		const { getByText } = render(<Button disabled>Test</Button>);
		const buttonElement = getByText(/Test/);
		expect(buttonElement).toBeDisabled();
	});
	it('renders button with text and type submit', () => {
		const { getByText } = render(<Button type='submit'>Test</Button>);
		const buttonElement = getByText(/Test/);
		expect(buttonElement).toHaveAttribute('type', 'submit');
	});
	it('renders button with onClick', () => {
		const onClick = vi.fn();
		const { getByText } = render(<Button onClick={onClick}>Test</Button>);
		const buttonElement = getByText(/Test/);
		buttonElement.click();
		expect(onClick).toHaveBeenCalled();
	});
});

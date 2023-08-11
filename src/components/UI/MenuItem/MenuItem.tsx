import { memo } from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};

interface MenuItemProps {
	children: string;
	path?: string;
	variant?: 'link' | 'button';
	onClick?: () => void;
}

const MenuItem = memo(({ children, path, variant = 'link', onClick }: MenuItemProps) => {
	return (
		<Menu.Item>
			{({ active }) =>
				variant === 'link' ? (
					<Link
						to={path || '/'}
						className={classNames(
							active ? 'bg-gray-500' : '',
							'block px-4 py-2 text-sm text-white w-full text-left'
						)}
					>
						{children}
					</Link>
				) : (
					<button
						className={classNames(
							active ? 'bg-gray-500' : '',
							'block px-4 py-2 text-sm text-white w-full text-left'
						)}
						onClick={onClick}
					>
						{children}
					</button>
				)
			}
		</Menu.Item>
	);
});

export default MenuItem;

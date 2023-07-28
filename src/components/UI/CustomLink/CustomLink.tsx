import { memo } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { ReactNode } from 'react';
import { getIconFromName } from './getIconFromName';
import { TypeIcon } from '../../../types/types';

interface CustomLinkProps {
	children: ReactNode;
	to: string;
	name: TypeIcon;
}

const activeClassName = 'flex gap-4 items-center bg-white/10 rounded-md p-2 duration-100 active:scale-95 max-lg:w-11';
const inactiveClassName =
	'flex gap-4 items-center opacity-60 hover:opacity-100 p-2 duration-100 active:scale-95 max-lg:w-11';

const CustomLink = memo(({ children, to, name }: CustomLinkProps) => {
	const match = useMatch(to);

	return (
		<Link to={to} className={match ? activeClassName : inactiveClassName}>
			{getIconFromName(name, match)}
			{children}
		</Link>
	);
});

export default CustomLink;

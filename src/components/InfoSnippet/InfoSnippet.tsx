import { memo } from 'react';

interface IInfoSnippetProps {
	title: string;
	content: string | number;
	icon: JSX.Element;
}

const InfoSnippet = memo(({ title, content, icon }: IInfoSnippetProps) => {
	return (
		<p className='text-lg text-gray-300 flex items-end gap-2'>
			{icon}
			<span className='text-white font-semibold'>{title}</span> {content}
		</p>
	);
});

export default InfoSnippet;

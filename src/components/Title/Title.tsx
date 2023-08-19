import { memo } from 'react';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children: string;
	pt?: string;
}

const Title = memo((props: TitleProps) => {
	const { children, pt = '20', ...restProps } = props;

	return (
		<div className={`flex justify-center pt-${pt}`} data-testid='title-container'>
			<h1 className={'text-5xl text-white font-bold'} {...restProps}>
				{children}
			</h1>
		</div>
	);
});

export default Title;

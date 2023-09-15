import { memo } from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	styles?: string;
}

const Container = memo((props: ContainerProps) => {
	const { ...restProps } = props;
	return <div className={`max-w-1945 3xl:w-full 3xl:my-0 3xl:mx-auto ${props.styles}`} {...restProps}></div>;
});

export default Container;

interface CommonCardProps {
	id: string;
	name: string;
	about: string;
	date: string;
}

export interface DefaultCardProps extends CommonCardProps {
	variant: 'default';
	kind: string;
	type: string;
	price: string;
	city: string;
	country: string;
}

export interface EditCardProps extends CommonCardProps {
	variant: 'edit';
	onRemoveEvent: (eventId: string) => void;
}

export type CardProps = DefaultCardProps | EditCardProps;

interface CommonCardProps {
	id: string;
	name: string;
	about: string;
	date: string;
}

export interface DefaultCardProps extends CommonCardProps {
	variant: 'default';
	mode: string;
	category: string;
	price: number;
	city: string;
	country: string;
	currency: string;
	isLiked: boolean;
	freePlaces: number;
}

export interface EditCardProps extends CommonCardProps {
	variant: 'edit';
	onRemoveEvent: (eventId: string) => void;
}

export type CardProps = DefaultCardProps | EditCardProps;

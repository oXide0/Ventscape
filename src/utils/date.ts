export const formatDate = (inputDate: string) => {
	const date = new Date(inputDate);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	const formattedDate = date.toLocaleString('en-US', options);

	return formattedDate;
};

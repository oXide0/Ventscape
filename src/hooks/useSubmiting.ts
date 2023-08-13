import { useState } from 'react';

type CallbackFunction = (...args: any[]) => Promise<void>;

export const useSubmiting = (callback: CallbackFunction) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');

	const submitting = async (...args: any[]) => {
		try {
			setIsSubmitting(true);
			await callback(...args);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return { submitting, isSubmitting, error };
};

import { useState } from 'react';

type CallbackFunction<Args extends unknown[] = unknown[]> = (...args: Args) => Promise<void>;

export const useSubmitting = <Args extends unknown[] = unknown[]>(callback: CallbackFunction<Args>) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitting = async (...args: Args) => {
        try {
            setIsSubmitting(true);
            await callback(...args);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitting, isSubmitting, error };
};

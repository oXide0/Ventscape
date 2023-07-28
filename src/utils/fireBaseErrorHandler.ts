export const firebaseErrorHandler = (error: string) => {
	return error.substring(10, error.length);
};

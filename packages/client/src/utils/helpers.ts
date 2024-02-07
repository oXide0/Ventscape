import { ProfileFormValues } from 'components/ProfileForm';
import { UserResponse } from 'shared/types';

export function isErrorWithMessage(error: unknown): error is { data: { message: string } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: unknown }).data === 'object' &&
        'message' in (error as { data: { message?: unknown } }).data &&
        typeof (error as { data: { message: unknown } }).data.message === 'string'
    );
}

export function getGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const mapUsersToProfileFormValues = (user: UserResponse): ProfileFormValues => {
    const { name, email, accountType, description } = user;

    return {
        name,
        email,
        accountType,
        description
    };
};

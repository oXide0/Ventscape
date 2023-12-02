import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from 'components/ProfileForm';
import { User } from 'types/types';
import { TestWrapper } from 'utils/tests';
import { vi } from 'vitest';

const mockSubmit = vi.fn();

describe('ProfileForm component', () => {
    it('renders correctly with user data', () => {
        render(
            <TestWrapper>
                <ProfileForm
                    userData={mockUserData}
                    submit={mockSubmit}
                    serverAvatarUrl='mock-avatar-url'
                />
            </TestWrapper>
        );

        expect(screen.getByPlaceholderText(/your name/i)).toHaveValue('John Doe');
        expect(screen.getByPlaceholderText(/write a few sentences/i)).toHaveValue(
            'A brief description.'
        );
        expect(screen.getByPlaceholderText(/your email/i)).toHaveValue('john@example.com');
        expect(screen.getByLabelText(/account type/i)).toHaveValue('creator');
    });

    it('submits form correctly', async () => {
        render(
            <TestWrapper>
                <ProfileForm
                    userData={mockUserData}
                    submit={mockSubmit}
                    serverAvatarUrl='mock-avatar-url'
                />
            </TestWrapper>
        );

        userEvent.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
        userEvent.type(
            screen.getByPlaceholderText(/write a few sentences/i),
            'A brief description.'
        );
        userEvent.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
        fireEvent.change(screen.getByLabelText(/account type/i), { target: { value: 'creator' } });
    });
});

const mockUserData: User = {
    name: 'John Doe',
    about: 'A brief description.',
    email: 'john@example.com',
    accountType: 'creator',
    password: 'password',
    followers: [],
    subscriptions: [],
    notifications: [],
};

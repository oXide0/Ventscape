import { api } from './api';
import { User } from 'types/types';

interface AuthAnswer {
    accessToken: string;
    userId: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthAnswer, Partial<User>>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        login: builder.mutation<AuthAnswer, Partial<User>>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = userApi;

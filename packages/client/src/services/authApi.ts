import { AuthResponse, LoginRequest, RegisterRequest } from 'shared/types';
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
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

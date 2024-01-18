import { api } from './api';

interface AuthAnswer {
    accessToken: string;
    userId: string;
}

interface RegisterBody {
    name: string;
    email: string;
    password: string;
    accountType: 'customer' | 'creator';
}

interface LoginBody {
    email: string;
    password: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthAnswer, RegisterBody>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        login: builder.mutation<AuthAnswer, LoginBody>({
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

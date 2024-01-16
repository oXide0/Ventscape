import { api } from './api';

interface UserByIdResponse {
    name: string;
    email: string;
    accountType: 'customer' | 'creator';
    avatarUrl: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserByIdResponse, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['Users'],
        }),
    }),
});

export const { useGetUserByIdQuery } = userApi;

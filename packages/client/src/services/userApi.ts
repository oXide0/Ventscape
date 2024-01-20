import { IUser } from 'types/types';
import { api } from './api';

interface UserByIdResponse {
    name: string;
    email: string;
    accountType: 'customer' | 'creator';
    avatarUrl: string;
    description: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserByIdResponse, string | null | undefined>({
            query: (id) => `/users/${id}`,
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation<UserByIdResponse, IUser>({
            query: (body) => ({
                url: `/users/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;

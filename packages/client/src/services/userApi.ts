import { UpdateUserRequest, UserResponse } from 'shared/types';
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, string | null | undefined>({
            query: (id) => `/users/${id}`,
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation<UserResponse, UpdateUserRequest>({
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

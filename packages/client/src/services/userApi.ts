import { UpdateUserRequest, UserResponse, USERS_ENDPOINT } from 'shared/types';
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, string | null | undefined>({
            query: (id) => `${USERS_ENDPOINT}/${id}`,
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation<UserResponse, UpdateUserRequest>({
            query: (body) => ({
                url: `${USERS_ENDPOINT}/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;

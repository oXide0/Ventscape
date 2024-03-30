import { UpdateUserRequest, UserResponse, USERS_ENDPOINT } from 'shared/types';
import { api } from './api';

interface Update extends UpdateUserRequest {
    id: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, string | null | undefined>({
            query: (id) => `${USERS_ENDPOINT}/${id}`,
            providesTags: ['Users']
        }),
        updateUser: builder.mutation<UserResponse, Update>({
            query: (body) => ({
                url: `${USERS_ENDPOINT}/${body.id}`,
                method: 'PUT',
                body: {
                    name: body.name,
                    description: body.description,
                    email: body.email,
                    avatarId: body.avatarId
                }
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;

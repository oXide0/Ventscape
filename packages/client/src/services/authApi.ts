import {
    AuthResponse,
    LOGIN_ENDPOINT,
    LOGOUT_ENDPOINT,
    LoginRequest,
    REGISTER_ENDPOINT,
    RegisterRequest
} from 'shared/types';
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: REGISTER_ENDPOINT,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Users']
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: LOGIN_ENDPOINT,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Users']
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: LOGOUT_ENDPOINT,
                method: 'POST'
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = userApi;

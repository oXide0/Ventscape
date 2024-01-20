import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RefreshData {
    accessToken: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        const refreshResult = (await baseQuery('/refresh', api, extraOptions)) as {
            data: RefreshData;
        };
        if (refreshResult.data) {
            localStorage.setItem('accessToken', refreshResult.data.accessToken);
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Events', 'Users'],
});

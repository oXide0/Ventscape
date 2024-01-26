import { api } from './api';
import { UPLOAD_ENDPOINT, FILES_ENDPOINT } from 'shared/types';

export const fileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEventImage: builder.query<{ imageUrl: string }, string>({
            query: (fileId) => ({
                url: `${FILES_ENDPOINT}/${fileId}`,
            }),
        }),
        uploadEventImage: builder.mutation<{ fileId: string }, { file: File | null }>({
            query: ({ file }) => {
                const formData = new FormData();
                formData.append('file', file || '');

                return {
                    url: `${FILES_ENDPOINT}/${UPLOAD_ENDPOINT}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        removeEventImage: builder.mutation<void, string>({
            query: (fileId) => ({
                url: `${FILES_ENDPOINT}/${fileId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetEventImageQuery, useUploadEventImageMutation, useRemoveEventImageMutation } =
    fileApi;

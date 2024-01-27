import { api } from './api';
import { UPLOAD_ENDPOINT, IMAGES_ENDPOINT } from 'shared/types';

export const imageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getImageUrl: builder.query<{ url: string }, string | null | undefined>({
            query: (imageId) => ({
                url: `${IMAGES_ENDPOINT}/${imageId}`,
            }),
            providesTags: ['Images'],
        }),
        uploadImage: builder.mutation<{ id: string }, { image: File | null }>({
            query: ({ image }) => {
                const formData = new FormData();
                formData.append('file', image || '');

                return {
                    url: `${IMAGES_ENDPOINT}/${UPLOAD_ENDPOINT}`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Images'],
        }),
        removeImage: builder.mutation<void, string>({
            query: (imageId) => ({
                url: `${IMAGES_ENDPOINT}/${imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Images'],
        }),
    }),
});

export const { useGetImageUrlQuery, useUploadImageMutation, useRemoveImageMutation } = imageApi;

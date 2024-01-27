import { api } from './api';
import { UPLOAD_ENDPOINT, IMAGES_ENDPOINT } from 'shared/types';

export const imageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEventImageUrl: builder.query<{ imageUrl: string }, string | null | undefined>({
            query: (imageId) => ({
                url: `${IMAGES_ENDPOINT}/${imageId}`,
            }),
            providesTags: ['Images'],
        }),
        uploadEventImage: builder.mutation<{ imageId: string }, { image: File | null }>({
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
        removeEventImage: builder.mutation<void, string>({
            query: (imageId) => ({
                url: `${IMAGES_ENDPOINT}/${imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Images'],
        }),
    }),
});

export const {
    useGetEventImageUrlQuery,
    useUploadEventImageMutation,
    useRemoveEventImageMutation,
} = imageApi;

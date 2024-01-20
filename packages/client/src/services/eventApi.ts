import { api } from './api';
import { IEvent } from 'types/types';

interface PostEventBody {
    id: string | undefined;
    title: string;
    description: string;
    date: string;
    category: string;
    mode: string;
    country?: string;
    city?: string;
    street?: string;
    link: string;
    price?: number;
    creatorId: string | null;
    img: string;
}

export const eventApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query<IEvent[], void>({
            query: () => '/events',
            providesTags: ['Events'],
        }),
        getEventById: builder.query<IEvent, string | undefined>({
            query: (id) => `/events/${id}`,
            providesTags: ['Events'],
        }),
        getEventsByCreatorId: builder.query<IEvent[], string | null | undefined>({
            query: (creatorId) => `/events/creator/${creatorId}`,
            providesTags: ['Events'],
        }),
        createEvent: builder.mutation<IEvent, Omit<PostEventBody, 'id'>>({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
        updateEvent: builder.mutation<IEvent, PostEventBody>({
            query: (body) => ({
                url: `/events/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
        deleteEvent: builder.mutation<void, string>({
            query: (id) => ({
                url: `/events/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'],
        }),
    }),
});

export const {
    useGetAllEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetEventsByCreatorIdQuery,
    useGetEventByIdQuery,
} = eventApi;

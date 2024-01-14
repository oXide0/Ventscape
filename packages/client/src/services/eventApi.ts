import { api } from './api';
import { Event } from 'types/types';

export const eventApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query<Event[], void>({
            query: () => '/events',
            providesTags: ['Events'],
        }),
        getEventById: builder.query<Event, string | undefined>({
            query: (id) => `/events/${id}`,
            providesTags: ['Events'],
        }),
        getEventByCreatorId: builder.query<Event[], string>({
            query: (creatorId) => `/events/creator/${creatorId}`,
            providesTags: ['Events'],
        }),
        createEvent: builder.mutation<Event, Partial<Event>>({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
        updateEvent: builder.mutation<Event, Partial<Event>>({
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
    useGetEventByCreatorIdQuery,
    useGetEventByIdQuery,
} = eventApi;

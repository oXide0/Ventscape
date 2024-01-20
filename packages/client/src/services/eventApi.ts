import { CreateEventRequest, UpdateEventRequest } from 'shared/types';
import { IEvent } from 'shared/types';
import { api } from './api';

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
        createEvent: builder.mutation<IEvent, CreateEventRequest>({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
        updateEvent: builder.mutation<IEvent, UpdateEventRequest>({
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

import { CreateEventRequest, EVENTS_ENDPOINT, IEvent, UpdateEventRequest } from 'shared/types';
import { api } from './api';

export interface IGetSavedEventsResponse {
    event: IEvent;
    id: string;
}

export const eventApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query<IEvent[], void>({
            query: () => EVENTS_ENDPOINT,
            providesTags: ['Events']
        }),
        getEventById: builder.query<IEvent, string | undefined>({
            query: (id) => `${EVENTS_ENDPOINT}/${id}`,
            providesTags: ['Events']
        }),
        getEventsByCreatorId: builder.query<IEvent[], string | null | undefined>({
            query: (creatorId) => `${EVENTS_ENDPOINT}/creator/${creatorId}`,
            providesTags: ['Events']
        }),
        createEvent: builder.mutation<IEvent, CreateEventRequest>({
            query: (body) => ({
                url: EVENTS_ENDPOINT,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Events']
        }),
        updateEvent: builder.mutation<IEvent, UpdateEventRequest>({
            query: (body) => ({
                url: `${EVENTS_ENDPOINT}/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Events']
        }),
        deleteEvent: builder.mutation<void, string>({
            query: (id) => ({
                url: `${EVENTS_ENDPOINT}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Events']
        }),
        getSavedEventsByUserId: builder.query<IGetSavedEventsResponse[], string | null | undefined>(
            {
                query: (userId) => `${EVENTS_ENDPOINT}/saved/${userId}`,
                providesTags: ['Events']
            }
        ),
        saveEvent: builder.mutation<void, { userId: string; eventId: string }>({
            query: ({ userId, eventId }) => ({
                url: `${EVENTS_ENDPOINT}/save/${userId}/${eventId}`,
                method: 'POST'
            }),
            invalidatesTags: ['Events']
        }),
        unsaveEvent: builder.mutation<void, string | null>({
            query: (id) => ({
                url: `${EVENTS_ENDPOINT}/unsave/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Events']
        })
    })
});

export const {
    useGetAllEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetEventsByCreatorIdQuery,
    useGetEventByIdQuery,
    useGetSavedEventsByUserIdQuery,
    useSaveEventMutation,
    useUnsaveEventMutation
} = eventApi;

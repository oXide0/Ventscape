import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateEventRequest, UpdateEventRequest } from 'shared/types';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

export const getAllEvents = async (_: Request, res: Response) => {
    try {
        const events = await prisma.events.findMany();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await prisma.events.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!event) return res.status(401).json({ message: 'Not events found' });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const getEventsByCreatorId = async (req: Request, res: Response) => {
    try {
        const events = await prisma.events.findMany({
            where: {
                creatorId: req.params.creatorId
            }
        });

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const body: CreateEventRequest = req.body;
        const event = await prisma.events.create({
            data: {
                id: v4(),
                ...body
            }
        });

        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot add event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const body: UpdateEventRequest = req.body;
        const event = await prisma.events.update({
            where: {
                id: req.params.id
            },
            data: body
        });

        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot update event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await prisma.events.delete({
            where: {
                id: req.params.id
            }
        });

        res.json('Event deleted');
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot delete event' });
    }
};

export const saveEventForUser = async (req: Request, res: Response) => {
    try {
        await prisma.userEvent.create({
            data: {
                id: v4(),
                userId: req.params.userId,
                eventId: req.params.eventId
            }
        });
        res.status(200).json('Event saved');
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot save event' });
    }
};

export const unsaveEventForUser = async (req: Request, res: Response) => {
    try {
        await prisma.userEvent.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json('Event unsaved');
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot unsave event' });
    }
};

export const getSavedEventsForUser = async (req: Request, res: Response) => {
    try {
        const userEventRecords = await prisma.userEvent.findMany({
            where: {
                userId: req.params.userId
            }
        });

        const events = await prisma.events.findMany({
            where: {
                id: {
                    in: userEventRecords.map((event) => event.eventId)
                }
            }
        });

        const userSavedEvents = userEventRecords.map((record) => ({
            id: record.id,
            event: events.find((event) => event.id === record.eventId)
        }));

        res.json(userSavedEvents);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot get saved events' });
    }
};

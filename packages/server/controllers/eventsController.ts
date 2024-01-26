import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateEventRequest, UpdateEventRequest } from 'shared/types';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

export const getAllEvents = async (_: Request, res: Response) => {
    try {
        const events = await prisma.events.findMany();
        res.json(
            events.map((event) => {
                const { creator_id, img_id, ...restEvent } = event;
                return { ...restEvent, creatorId: creator_id, imgId: img_id };
            })
        );
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await prisma.events.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!event) return res.status(401).json({ message: 'Not events found' });
        const { creator_id, img_id, ...restEvent } = event;
        res.json({ ...restEvent, creatorId: creator_id, imgId: img_id });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const getEventsByCreatorId = async (req: Request, res: Response) => {
    try {
        const events = await prisma.events.findMany({
            where: {
                creator_id: req.params.creatorId,
            },
        });

        res.json(
            events.map((event) => {
                const { creator_id, img_id, ...restEvent } = event;
                return { ...restEvent, creatorId: creator_id, imgId: img_id };
            })
        );
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { creatorId, imgId, ...restBody }: CreateEventRequest = req.body;
        const event = await prisma.events.create({
            data: {
                id: v4(),
                creator_id: creatorId,
                img_id: imgId,
                ...restBody,
            },
        });

        const { creator_id, img_id, ...restEvent } = event;
        res.json({ ...restEvent, creatorId: creator_id, imgId: img_id });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot add event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { creatorId, imgId, ...restBody }: UpdateEventRequest = req.body;
        const event = await prisma.events.update({
            where: {
                id: req.params.id,
            },
            data: {
                creator_id: creatorId,
                img_id: imgId,
                ...restBody,
            },
        });

        const { creator_id, img_id, ...restEvent } = event;
        res.json({ ...restEvent, creatorId: creator_id, imgId: img_id });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot update event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await prisma.events.delete({
            where: {
                id: req.params.id,
            },
        });

        res.json('Event deleted');
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot delete event' });
    }
};

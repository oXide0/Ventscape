import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
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
                id: req.params.id,
            },
        });
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
                creator_id: req.params.creatorId,
            },
        });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const event = await prisma.events.create({
            data: {
                id: v4(),
                creator_id: req.body.creatorId,
                ...req.body,
            },
        });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot add event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const event = await prisma.events.update({
            where: {
                id: req.params.id,
            },
            data: {
                ...req.body,
            },
        });

        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot update event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event = await prisma.events.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot delete event' });
    }
};

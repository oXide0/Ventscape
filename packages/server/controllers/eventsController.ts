import { v4 } from 'uuid';
import { databaseQuery } from '../db';
import { Request, Response } from 'express';

export const getAllEvents = async (_: Request, res: Response) => {
    try {
        const result = await databaseQuery('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const result = await databaseQuery('SELECT * FROM events WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not events found' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            category,
            date,
            street,
            city,
            country,
            link,
            price,
            creatorId,
            img,
        } = req.body;
        const eventId = v4();

        const result = await databaseQuery(
            'INSERT INTO events (id, title, about, category, date, street, city, country, link, price, creatorId, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [
                eventId,
                title,
                description,
                category,
                date,
                street,
                city,
                country,
                link,
                price,
                creatorId,
                img,
            ]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot add event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            category,
            date,
            street,
            city,
            country,
            link,
            price,
            creatorId,
            img,
        } = req.body;
        const eventId = v4();

        const result = await databaseQuery(
            'INSERT INTO events (id, title, about, category, date, street, city, country, link, price, creatorId, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [
                eventId,
                title,
                description,
                category,
                date,
                street,
                city,
                country,
                link,
                price,
                creatorId,
                img,
            ]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot update event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const result = await databaseQuery('DELETE FROM events WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Cannot delete event' });
    }
};

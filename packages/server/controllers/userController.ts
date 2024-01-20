import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (user) {
            res.status(200).json({
                name: user.name,
                email: user.email,
                accountType: user.account_type,
                avatarUrl: user.avatar_url,
                description: user.description,
            });
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not user found' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                avatar_url: req.body.avatarUrl,
                description: req.body.description,
            },
        });
        res.status(200).json({
            name: user.name,
            email: user.email,
            accountType: user.account_type,
            avatarUrl: user.avatar_url,
            description: user.description,
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not user found' });
    }
};

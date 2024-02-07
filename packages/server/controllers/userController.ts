import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UpdateUserRequest } from 'shared/types';

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            res.status(200).json({
                name: user.name,
                email: user.email,
                accountType: user.account_type,
                avatarId: user.avatar_id,
                description: user.description
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
    const { name, email, avatarId, description }: UpdateUserRequest = req.body;

    try {
        const user = await prisma.users.update({
            where: {
                id: req.params.id
            },
            data: {
                name: name,
                email: email,
                avatar_id: avatarId,
                description: description
            }
        });
        res.status(200).json({
            name: user.name,
            email: user.email,
            accountType: user.account_type,
            avatarId: user.avatar_id,
            description: user.description
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Not user found' });
    }
};

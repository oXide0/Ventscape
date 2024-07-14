import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginRequest, RegisterRequest } from 'shared/types';
import { v4 } from 'uuid';
import { environment } from '../environment';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, accountType }: RegisterRequest = req.body;
    if (!name || !email || !password || !accountType) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const duplicateUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (duplicateUser) {
        return res.status(404).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = v4();
        await prisma.user.create({
            data: {
                id: userId,
                name: name,
                email: email,
                password: hashedPassword,
                accountType: accountType
            }
        });

        const accessToken = jwt.sign({ name }, environment.accessTokenSecret!, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ name }, environment.refreshTokenSecret!, {
            expiresIn: '14d'
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: refreshToken
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 14 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ accessToken, userId });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: LoginRequest = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const accessToken = jwt.sign({ name: user.name }, environment.accessTokenSecret!, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ name: user.name }, environment.refreshTokenSecret!, {
            expiresIn: '14d'
        });

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: refreshToken
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 14 * 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, userId: user.id, accountType: user.accountType });
    } else {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies.refreshToken) {
        return res.status(401).json({ message: 'No cookies found' });
    }
    const refreshToken = cookies.refreshToken;
    const foundUser = await prisma.user.findUnique({
        where: {
            refreshToken: refreshToken
        }
    });

    if (!foundUser) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(
        refreshToken,
        environment.refreshTokenSecret!,
        (err: jwt.VerifyErrors | null, decoded: any) => {
            if (err || foundUser.name !== decoded.name) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            const accessToken = jwt.sign({ name: foundUser.name }, environment.accessTokenSecret!, {
                expiresIn: '1h'
            });
            res.json({ accessToken });
        }
    );
};

export const logoutUser = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies.refreshToken) {
        return res.status(204).json({ message: 'No cookies found' });
    }
    const refreshToken = cookies.refreshToken;

    const foundUser = await prisma.user.findUnique({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!foundUser) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
        return res.status(204).json({ message: 'Invalid refresh token' });
    }

    await prisma.user.update({
        where: {
            id: foundUser.id
        },
        data: {
            refreshToken: null
        }
    });

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(201).json({ message: 'User logged out' });
};

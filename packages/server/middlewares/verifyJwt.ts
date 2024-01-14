import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Token is not valid' });
        }
        next();
    });
};

export { verifyJwt };

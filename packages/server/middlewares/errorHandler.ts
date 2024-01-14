import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, __: Request, res: Response, _: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
};

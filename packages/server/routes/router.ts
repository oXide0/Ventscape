import express from 'express';
import eventsRouter from './events';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use(authRouter);
router.use('/events', eventsRouter);
router.use('/users', userRouter);

export default router;

import express from 'express';
import { EVENTS_ENDPOINT, USERS_ENDPOINT } from 'shared/types';
import authRouter from './auth';
import eventsRouter from './events';
import userRouter from './user';

const router = express.Router();

router.use(authRouter);
router.use(EVENTS_ENDPOINT, eventsRouter);
router.use(USERS_ENDPOINT, userRouter);

export default router;

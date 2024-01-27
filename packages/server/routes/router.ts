import express from 'express';
import { EVENTS_ENDPOINT, IMAGES_ENDPOINT, USERS_ENDPOINT } from 'shared/types';
import authRouter from './auth';
import eventsRouter from './events';
import imagesRouter from './images';
import userRouter from './user';

const router = express.Router();

router.use(authRouter);
router.use(EVENTS_ENDPOINT, eventsRouter);
router.use(USERS_ENDPOINT, userRouter);
router.use(IMAGES_ENDPOINT, imagesRouter);

export default router;

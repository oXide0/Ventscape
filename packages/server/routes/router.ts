import express from 'express';
import eventsRouter from './events';
import authRouter from './auth';

const router = express.Router();

router.use('/events', eventsRouter);
router.use(authRouter);

export default router;

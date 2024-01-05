import express from 'express';
import eventsRouter from './events';
import usersRouter from './users';
const router = express.Router();

router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;

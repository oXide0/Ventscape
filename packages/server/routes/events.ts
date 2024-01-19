import express from 'express';
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    getEventsByCreatorId,
    updateEvent,
} from '../controllers/eventsController';
import { verifyJwt } from '../middlewares/verifyJwt';
const router = express.Router();

router.route('/').get(getAllEvents);
router.route('/:id').get(getEventById);
router.route('/creator/:creatorId').get(getEventsByCreatorId);

router.route('/').post(verifyJwt, createEvent);
router.route('/:id').put(verifyJwt, updateEvent);
router.route('/:id').delete(verifyJwt, deleteEvent);

export default router;

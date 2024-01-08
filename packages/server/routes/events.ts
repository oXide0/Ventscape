import express from 'express';
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
} from '../controllers/eventsController';
import { verifyJwt } from '../middlewares/verifyJwt';
const router = express.Router();

router.route('/').get(verifyJwt, getAllEvents);
router.route('/:id').get(getEventById);

router.route('/').post(verifyJwt, createEvent);
router.route('/:id').put(verifyJwt, updateEvent);
router.route('/:id').delete(verifyJwt, deleteEvent);

export default router;

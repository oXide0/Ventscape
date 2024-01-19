import express from 'express';
import { getUserById, updateUser } from '../controllers/userController';
import { verifyJwt } from '../middlewares/verifyJwt';

const router = express.Router();

router.get('/:id', getUserById, verifyJwt);
router.put('/:id', updateUser, verifyJwt);

export default router;

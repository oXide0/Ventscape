import express from 'express';
import {
    handleRefreshToken,
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/authController';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', handleRefreshToken);
router.post('/logout', logoutUser);

export default router;

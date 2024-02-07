import express from 'express';
import {
    LOGIN_ENDPOINT,
    LOGOUT_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
    REGISTER_ENDPOINT
} from 'shared/types';
import {
    handleRefreshToken,
    loginUser,
    logoutUser,
    registerUser
} from '../controllers/authController';
const router = express.Router();

router.post(REGISTER_ENDPOINT, registerUser);
router.post(LOGIN_ENDPOINT, loginUser);
router.get(REFRESH_TOKEN_ENDPOINT, handleRefreshToken);
router.post(LOGOUT_ENDPOINT, logoutUser);

export default router;

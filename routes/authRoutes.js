import express from 'express';
import { googleAuth, loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/google-auth', googleAuth);

export default router;

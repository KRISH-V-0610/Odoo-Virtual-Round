

import express from 'express';
import { register, login,protect, logout, isLoggedIn } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logout); 
router.post('/protected-logout', protect, logout);
router.get('/check-auth', isLoggedIn); // Add this route

export default router;
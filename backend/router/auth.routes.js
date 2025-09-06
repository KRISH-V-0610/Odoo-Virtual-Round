import express from 'express';
const router = express.Router();

import { login, signup, logout,getCurrentUser} from '../controllers/auth.controller.js';
// import { protectedRoute } from '../middleware/auth.middleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user/current-user', getCurrentUser);
// router.put('/update-profile',protectedRoute, updateProfile);
// router.get('/check-auth',protectedRoute, checkAuth);


export default router;
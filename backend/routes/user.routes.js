import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  getUserProfile,
  updateUserProfile,
  getUserListings,
  getUserPurchases
} from '../controllers/user.controller.js';

import { uploadUserProfile } from '../config/cloudinary.config.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile',  uploadUserProfile.single('profilePicture'), updateUserProfile);
router.get('/listings', getUserListings);
router.get('/purchases', getUserPurchases);

export default router;
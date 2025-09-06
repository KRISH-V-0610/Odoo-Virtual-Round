import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  getUserProfile,
  updateUserProfile,
  getUserListings,
  getUserPurchases
} from '../controllers/user.controller.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/listings', getUserListings);
router.get('/purchases', getUserPurchases);

export default router;
// routes/orders.js
import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  checkout,
  getOrder,
  getUserOrders
} from '../controllers/order.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/checkout', checkout);
router.get('/', getUserOrders);
router.get('/:id', getOrder);

export default router;
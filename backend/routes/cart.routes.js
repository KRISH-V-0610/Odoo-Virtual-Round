import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cart.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:productId', updateCartItem);
router.delete('/remove/:productId', removeFromCart);

export default router;
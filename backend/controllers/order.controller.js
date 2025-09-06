// controllers/orderController.js
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Cart is empty',
      });
    }
    
    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of cart.items) {
      const product = item.product;
      
      // Check if product is still available
      if (product.status !== 'available') {
        return res.status(400).json({
          status: 'fail',
          message: `Product "${product.title}" is no longer available`,
        });
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
      
      // Update product status to sold
      await Product.findByIdAndUpdate(
        product._id,
        { status: 'sold' }
      );
    }
    
    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      status: 'completed'
    });
    
    // Add order to user's purchases
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { purchases: order._id } }
    );
    
    // Clear cart
    cart.items = [];
    await cart.save();
    
    await order.populate('items.product');
    
    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }
    
    // Check if user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only view your own orders',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');
    
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
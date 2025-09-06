// controllers/cartController.js
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product');
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    // Check if product is available
    if (product.status !== 'available') {
      return res.status(400).json({
        status: 'fail',
        message: 'Product is not available',
      });
    }
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      // Create cart if it doesn't exist
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, quantity }]
      });
    } else {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ product: productId, quantity });
      }
      
      await cart.save();
    }
    
    await cart.populate('items.product');
    
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === req.params.productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart',
      });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );
    
    await cart.save();
    await cart.populate('items.product');
    
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
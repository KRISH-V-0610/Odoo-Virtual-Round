// controllers/userController.js
import User from '../models/user.model.js';
// import Product from '../models/product.model.js';
// import Order from '../models/order.model.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('listings')
      .populate({
        path: 'purchases',
        populate: {
          path: 'items.product',
          model: 'Product'
        }
      });
    
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const userId = req.user.id;

    // Check username uniqueness
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return res.status(409).json({
          status: 'fail',
          message: 'Username is already taken by another user',
        });
      }
    }

    // Check email uniqueness
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email is already taken by another user',
        });
      }
    }

    // Get current user and update fields
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;
    if (password) user.password = password; // This will trigger pre-save middleware

    // Save the user - this will trigger password hashing
    const updatedUser = await user.save();

    // Remove password from response
    updatedUser.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    // Handle errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        status: 'fail',
        message: `${field} is already taken`,
      });
    }
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        status: 'fail',
        message: errors.join(', '),
      });
    }

    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getUserListings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('listings');
    
    res.status(200).json({
      status: 'success',
      results: user.listings.length,
      data: {
        listings: user.listings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getUserPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'purchases',
      populate: {
        path: 'items.product',
        model: 'Product'
      }
    });
    
    res.status(200).json({
      status: 'success',
      results: user.purchases.length,
      data: {
        purchases: user.purchases,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
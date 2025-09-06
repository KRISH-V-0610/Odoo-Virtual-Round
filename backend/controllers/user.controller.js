// controllers/userController.js
import User from '../models/user.model.js';
import {cloudinary } from '../config/cloudinary.config.js';

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
    const { username, email, password } = req.body;
    const userId = req.user.id;

    // Check username uniqueness
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        // Delete uploaded file if username validation fails
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }
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
        // Delete uploaded file if email validation fails
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(409).json({
          status: 'fail',
          message: 'Email is already taken by another user',
        });
      }
    }

    // Get current user
    const user = await User.findById(userId);
    
    if (!user) {
      // Delete uploaded file if user not found
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Store old profile picture for deletion
    let oldProfilePublicId = null;
    if (user.profilePicture && user.profilePicture.includes('cloudinary')) {
      // Extract public_id from Cloudinary URL
      const urlParts = user.profilePicture.split('/');
      const filename = urlParts[urlParts.length - 1];
      oldProfilePublicId = `ecofinds/users/profile/${filename.split('.')[0]}`;
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    // Handle profile picture upload
    if (req.file) {
      user.profilePicture = req.file.path; // Cloudinary URL
    }

    // Save the user
    const updatedUser = await user.save();

    // Delete old profile picture from Cloudinary if new one was uploaded
    if (req.file && oldProfilePublicId) {
      try {
        await cloudinary.uploader.destroy(oldProfilePublicId);
      } catch (deleteError) {
        console.error('Error deleting old profile picture:', deleteError);
        // Don't fail the request if deletion fails
      }
    }

    // Remove password from response
    updatedUser.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    // Delete uploaded file if any error occurs
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (deleteError) {
        console.error('Error deleting uploaded file:', deleteError);
      }
    }

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
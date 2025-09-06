// controllers/productController.js
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

export const getAllProducts = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    // Search functionality
    if (req.query.search) {
      queryObj.title = { $regex: req.query.search, $options: 'i' };
    }
    
    let query = Product.find(queryObj).populate('seller', 'username profilePicture');
    
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    const products = await query;
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'username profilePicture');
    
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, images } = req.body;
    
    // 1. Validate required fields
    if (!title || !description || !category || !price) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title, description, category, and price are required fields'
      });
    }

    // 2. Validate title length
    if (title.length > 100) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title must be less than 100 characters'
      });
    }

    // 3. Validate description length
    if (description.length > 1000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description must be less than 1000 characters'
      });
    }

    // 4. Validate category
    const validCategories = ['Clothing', 'Electronics', 'Books', 'Furniture', 'Sports', 'Toys', 'Other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'fail',
        message: `Category must be one of: ${validCategories.join(', ')}`
      });
    }

    // 5. Validate price
    const priceNum = Number(price);

    // 6. Validate images array (if provided)
    if (images && !Array.isArray(images)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Images must be an array of strings'
      });
    }

    if (images && images.length > 0) {
      for (const image of images) {
        if (typeof image !== 'string') {
          return res.status(400).json({
            status: 'fail',
            message: 'Each image must be a string (URL or file path)'
          });
        }
      }
    }

    // 7. Trim and sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      price: priceNum,
      images: images && images.length > 0 
        ? images.map(img => img.trim()).filter(img => img !== '')
        : ['placeholder-image.jpg'],
      seller: req.user.id
    };

    // 8. Create product
    const newProduct = await Product.create(sanitizedData);
    
    // 9. Add product to user's listings
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { listings: newProduct._id } }
    );
    
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        status: 'fail',
        message: errors.join(', ')
      });
    }

    // Handle duplicate key errors (if any)
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product with similar details already exists'
      });
    }

    // Handle cast errors (invalid data types)
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid data format provided'
      });
    }

    // Generic error
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Check if user owns the product
    const product = await Product.findById(req.params.id);
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own products',
      });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Check if user owns the product
    const product = await Product.findById(req.params.id);
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own products',
      });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    // Remove product from user's listings
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { listings: req.params.id } }
    );
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ 
      category: req.params.category 
    }).populate('seller', 'username profilePicture');
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
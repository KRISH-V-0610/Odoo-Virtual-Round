// controllers/authController.js
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if request body is valid
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Username, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    if (existingUser) {
      return res.status(409).json({ // 409 Conflict
        status: "fail",
        message: "User with this email or username already exists",
      });
    }

    // 3️⃣ Create new user
    const newUser = await User.create({ username, email, password });

    // 4️⃣ Send token and success response
    createSendToken(newUser, 201, res);

  } catch (err) {
    console.error("Registration error:", err);

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: Object.values(err.errors).map(e => e.message).join(", "),
      });
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Duplicate field value entered",
      });
    }

    // Generic server error
    res.status(500).json({
      status: "error",
      message: "Something went wrong on our side. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check if username and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ username }).select("+password");

    // 3️⃣ Validate credentials
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    // 4️⃣ Everything ok → Send JWT token
    createSendToken(user, 200, res);

  } catch (err) {
    console.error("Login error:", err);

    // Handle mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: Object.values(err.errors).map(e => e.message).join(", "),
      });
    }

    // Handle mongoose bad ObjectId or query issues
    if (err.name === "CastError") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid data format",
      });
    }

    // Default → Server error
    res.status(500).json({
      status: "error",
      message: "Something went wrong on our side. Please try again later.",
    });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting it to expired
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1000), // Expire in 1 second
      httpOnly: true,
    });

    // Alternatively, if using token in Authorization header,
    // you can just send a success response as the client should remove the token
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged out',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error during logout',
    });
  }
};

export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there - check both header and cookie
    let token;
    
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === 'loggedout') {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }
};


import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) res.status(400).json({ message: `Please enter all fields` });

    if (password.length < 6) res.status(400).json({ message: `Password must be at least 6 characters` });

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: `User ${username} already exists` });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({ message: `User ${username} created successfully`, user: newUser });
    }
    else {
      res.status(400).json({ message: `Failed to create user ${username}` });
    }

  } catch (error) {
    console.log("error creating user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const login = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) res.status(400).json({ message: `Please enter email and password` });

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: `Invalid email or password` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: `Invalid email or password` });

    generateToken(user._id, res);
    res.status(201).json({ message: `Login successful`, user: user });
  }
  catch (error) {
    console.log("error logging in", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const logout = (req, res) => {

  try {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({ message: `Logged out successfully` });
  } catch (error) {
    console.log("logout failed", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no token provided' 
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find the user by ID from decoded token
    const user = await User.findById(decoded.userId)
      .select('-password -__v') // Exclude sensitive/uneeded fields
      .populate({
        path: 'patients',
        select: '-__v -createdAt -updatedAt' // Exclude unnecessary patient fields
      });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Return the user data
    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Error fetching current user:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, invalid token' 
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Session expired, please login again' 
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching user data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// export const updateProfile = async (req,res)=>{
//     try {
//       const {profilePic} = req.body;
//       const userId = req.user._id;

//       if(!profilePic) return res.status(400).json({ message:`Profile pic is required`});

//       const uploadResponse = await cloudinary.uploader.upload(profilePic);
//       const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

//       res.status(200).json(updatedUser);

//     } catch (error) {
//       console.log("error updating profile", error.message);
//       res.status(500).json({message: "Internal Server Error"});
//     }
// }

// export const checkAuth = (req,res) =>{
//   try {
//     console.log(req.body)
//     res.status(200).json(req.user);
//   }
//   catch (error) {
//     console.log("error chech Auth controller", error.message);
//     res.status(500).json({message: "Internal Server Error"});
//   }
// }
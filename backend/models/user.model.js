import mongoose from 'mongoose';
const { Schema } = mongoose; // Destructure Schema from mongoose

const userSchema = new Schema({  // Use Schema directly here
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    // match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },

  patients: [{
    type: Schema.Types.ObjectId, // Now correctly referencing Schema
    ref: 'Patient'
  }],


  // role: {
  //   type: String,
  //   enum: ['doctor', 'admin'], // Add other roles if needed
  //   default: 'doctor'
  // },
  // profile: {
  //   firstName: String,
  //   lastName: String,
  //   specialization: String,
  //   hospital: String,
  //   contactNumber: String,
  //   avatarUrl: String
  // }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);
export default User;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional — not needed for Google OAuth users
  googleId: { type: String, unique: true, sparse: true },
  avatar: { type: String }, // Google profile picture
  is2FAEnabled: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;

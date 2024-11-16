import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Service to authenticate a user and generate a JWT
export const loginUserService = async (username, password) => {
  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username, roles: user.roles },
    process.env.JWT_SECRET, // Make sure to set this in your .env file
    { expiresIn: '1h' } // Set token expiration time (1 hour in this case)
  );

  return { user, token };
};

export const generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetToken = hashedToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1-hour expiration
  await user.save();

  // Send resetToken (not hashed) to the user via email.
  return resetToken;
};
  
export const resetPassword = async (resetToken, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  const user = await User.findOne({ resetToken: hashedToken });
  if (!user || user.resetTokenExpiration < Date.now()) {
    throw new Error('Invalid or expired reset token');
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
};
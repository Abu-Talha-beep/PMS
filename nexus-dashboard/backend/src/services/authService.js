import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

export const authService = {
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists with that email');
    }

    user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id, user.role);
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
  },

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id, user.role);
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
  },

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  async getAllUsers() {
    const users = await User.find().select('-password');
    return users;
  },

  async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

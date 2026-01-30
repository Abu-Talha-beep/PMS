import express from 'express';
import { register, login, getCurrentUser, getAllUsers, updateUser, deleteUser } from '../controllers/authController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;

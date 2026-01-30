import express from 'express';
import {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getLowStockItems,
  getInventoryStats,
} from '../controllers/inventoryController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public routes (can be changed based on requirements)
router.get('/', getInventory);
router.get('/stats', getInventoryStats);
router.get('/low-stock', getLowStockItems);
router.get('/:id', getInventoryById);

// Protected routes
router.post('/', protect, authorize('admin', 'staff'), createInventory);
router.put('/:id', protect, authorize('admin', 'staff'), updateInventory);
router.delete('/:id', protect, authorize('admin'), deleteInventory);

export default router;

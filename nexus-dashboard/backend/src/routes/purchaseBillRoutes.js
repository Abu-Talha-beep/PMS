import express from 'express';
import {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
  getBillStats,
} from '../controllers/purchaseBillController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBills);
router.get('/stats', getBillStats);
router.get('/:id', getBillById);

// Protected routes
router.post('/', protect, authorize('admin', 'staff'), createBill);
router.put('/:id', protect, authorize('admin', 'staff'), updateBill);
router.delete('/:id', protect, authorize('admin'), deleteBill);

export default router;

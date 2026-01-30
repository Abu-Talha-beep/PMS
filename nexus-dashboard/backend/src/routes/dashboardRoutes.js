import express from 'express';
import { getDashboardStats, getChartData } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/chart-data', protect, getChartData);

export default router;

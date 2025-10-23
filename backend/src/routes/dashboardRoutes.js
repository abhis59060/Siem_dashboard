// src/routes/dashboardRoutes.js
import { Router } from 'express';
import { getDashboardStats, getRecentAlerts, getThreatTrends } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validatePagination } from '../utils/validators.js';

const router = Router();

router.get('/stats', authenticateToken, getDashboardStats);
router.get('/alerts', authenticateToken, validatePagination, getRecentAlerts);
router.get('/trends', authenticateToken, getThreatTrends);

export default router;
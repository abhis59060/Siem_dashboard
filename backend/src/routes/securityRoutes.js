// src/routes/securityRoutes.js
import { Router } from 'express';
import * as securityController from '../controllers/securityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/metrics', authenticateToken, securityController.getSecurityMetrics);
router.get('/status', authenticateToken, securityController.getSystemStatus);
router.post('/status', authenticateToken, securityController.updateSystemStatus);

export default router;
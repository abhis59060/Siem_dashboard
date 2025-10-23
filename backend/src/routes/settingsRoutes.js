// src/routes/settingsRoutes.js
import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, settingsController.getSettings);
router.put('/', authenticateToken, settingsController.updateSettings);
router.get('/global', authenticateToken, authorizeRoles('admin'), settingsController.getGlobalSettings);

export default router;
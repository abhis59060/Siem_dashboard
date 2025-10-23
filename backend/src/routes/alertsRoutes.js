// src/routes/alertsRoutes.js
import { Router } from 'express';
import * as alertsController from '../controllers/alertsController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateAlert, validatePagination } from '../utils/validators.js';

const router = Router();

router.get('/', authenticateToken, validatePagination, alertsController.getAlerts);
router.post('/', authenticateToken, validateAlert, alertsController.createAlert);
router.put('/:id', authenticateToken, alertsController.updateAlert);
router.delete('/:id', authenticateToken, alertsController.deleteAlert);

export default router;
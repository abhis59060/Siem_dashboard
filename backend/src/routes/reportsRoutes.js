// src/routes/reportsRoutes.js
import { Router } from 'express';
import * as reportsController from '../controllers/reportsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/summary', authenticateToken, reportsController.getReportSummary);
router.get('/pdf', authenticateToken, reportsController.generatePDFReport);
router.get('/csv', authenticateToken, reportsController.generateCSVReport);

export default router;
// src/app.js
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { connectMongoDB } from './config/db.js';
import envConfig from './config/env.js';
import { logger } from './utils/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// ALL ROUTES IMPORTS
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import alertsRoutes from './routes/alertsRoutes.js';
import reportsRoutes from './routes/reportsRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import securityRoutes from './routes/securityRoutes.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: envConfig.allowedOrigins,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: envConfig.rateLimitWindowMs,
  max: envConfig.maxRequestsPerWindow,
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API ROUTES - ALL MOUNTED
app.use(`${envConfig.apiPrefix}/auth`, authRoutes);
app.use(`${envConfig.apiPrefix}/dashboard`, dashboardRoutes);
app.use(`${envConfig.apiPrefix}/alerts`, alertsRoutes);
app.use(`${envConfig.apiPrefix}/reports`, reportsRoutes);
app.use(`${envConfig.apiPrefix}/settings`, settingsRoutes);
app.use(`${envConfig.apiPrefix}/security`, securityRoutes);

// Health check
app.get('/health', async (req, res) => {
  res.json({ 
    success: true, 
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
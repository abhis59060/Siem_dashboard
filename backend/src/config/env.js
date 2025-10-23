// src/config/env.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env');
  const env = dotenv.config({ path: envPath });
  
  if (env.error) {
    logger.warn('No .env file found, using system environment variables');
  } else {
    logger.info('Environment variables loaded from .env file');
  }
};

// Validate required environment variables
const validateRequiredEnvVars = () => {
  const requiredVars = [
    'PORT',
    'NODE_ENV',
    'JWT_SECRET',
    'MONGODB_URI',
  ];

  const missingVars = [];
  const validationResults = {};

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
    validationResults[varName] = !!process.env[varName];
  });

  if (missingVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  logger.info('All required environment variables are present');
  return validationResults;
};

// Get environment-specific configuration
const getEnvConfig = () => {
  const config = {
    port: parseInt(process.env.PORT, 10) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    
    // Database
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/siem_dashboard',
    elasticsearchUrl: process.env.ELASTICSEARCH_URL,
    
    // Authentication
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    
    // API
    apiPrefix: process.env.API_PREFIX || '/api',
    
    // CORS
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    
    // Logging
    logLevel: process.env.LOG_LEVEL || 'info',
    
    // SIEM Specific
    siemDataRetentionDays: parseInt(process.env.SIEM_DATA_RETENTION_DAYS, 10) || 30,
    maxAlertsPerPage: parseInt(process.env.MAX_ALERTS_PER_PAGE, 10) || 50,
    
    // Security
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
    maxRequestsPerWindow: parseInt(process.env.MAX_REQUESTS_PER_WINDOW, 10) || 100,
  };

  // Optional validation for production
  if (config.isProduction) {
    if (!config.jwtSecret || config.jwtSecret.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters in production');
    }
    
    if (config.allowedOrigins.length === 0) {
      throw new Error('ALLOWED_ORIGINS must be configured in production');
    }
  }

  return config;
};

// Initialize environment configuration
const initEnv = () => {
  loadEnv();
  validateRequiredEnvVars();
  const config = getEnvConfig();
  
  logger.info(`Environment initialized: ${config.nodeEnv} mode`);
  logger.info(`Server will run on port: ${config.port}`);
  
  return config;
};

// Export configuration
export const envConfig = initEnv();
export default envConfig;

// Export individual environment variables for convenience
export const {
  port,
  nodeEnv,
  isDevelopment,
  isProduction,
  mongodbUri,
  elasticsearchUrl,
  jwtSecret,
  jwtExpiry,
  apiPrefix,
  allowedOrigins,
  logLevel,
  siemDataRetentionDays,
  maxAlertsPerPage,
  rateLimitWindowMs,
  maxRequestsPerWindow,
} = envConfig;
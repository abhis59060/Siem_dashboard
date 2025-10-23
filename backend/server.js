// server.js
import http from 'http';
import app from './src/app.js';
import { connectMongoDB } from './src/config/db.js';
import RealTimeService from './src/services/realTimeService.js';
import SIEMService from './src/services/siemService.js';
import { logger } from './src/utils/logger.js';
import envConfig from './src/config/env.js';

const httpServer = http.createServer(app);
const realTimeService = new RealTimeService(httpServer);

const startServer = async () => {
  try {
    // Connect to database
    await connectMongoDB();
    logger.info('✅ MongoDB connected');

    // Generate sample data in development
    if (envConfig.isDevelopment) {
      await SIEMService.generateSampleData(20);
      logger.info('✅ Sample data generated');
    }

    // Start server
    httpServer.listen(envConfig.port, () => {
      logger.info(`🚀 Server running on port ${envConfig.port}`);
      logger.info(`📊 Environment: ${envConfig.nodeEnv}`);
      logger.info(`🔗 API Prefix: ${envConfig.apiPrefix}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
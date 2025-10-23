// src/services/realTimeService.js
import { Server } from 'socket.io';
import SIEMService from './siemService.js';
import { logger } from '../utils/logger.js';

export class RealTimeService {
  constructor(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS,
        methods: ['GET', 'POST'],
      },
    });

    this.setupEventHandlers();
    logger.info('Real-time service initialized');
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      logger.info(`User connected: ${socket.id}`);

      // Send current alerts on connect
      socket.emit('initialAlerts', { alerts: [] });

      // Join user room
      socket.on('join', (userId) => {
        socket.join(`user_${userId}`);
        logger.info(`User ${userId} joined room`);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`);
      });

      // Generate demo alerts every 10 seconds
      const interval = setInterval(() => {
        if (socket.connected) {
          const mockAlert = SIEMService.generateMockAlert();
          socket.emit('newAlert', mockAlert);
        }
      }, 10000);

      socket.on('disconnect', () => clearInterval(interval));
    });
  }

  // Broadcast to all users
  broadcast(event, data) {
    this.io.emit(event, data);
  }

  // Broadcast to specific user
  sendToUser(userId, event, data) {
    this.io.to(`user_${userId}`).emit(event, data);
  }

  getConnectedCount() {
    return this.io.engine.clientsCount;
  }
}

export default RealTimeService;
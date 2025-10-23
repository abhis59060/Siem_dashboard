// src/models/SystemStatus.js
import mongoose from 'mongoose';

const systemStatusSchema = new mongoose.Schema({
  overallStatus: {
    type: String,
    enum: ['healthy', 'warning', 'critical'],
    default: 'healthy',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  components: {
    database: {
      status: { type: String, enum: ['healthy', 'warning', 'critical'], default: 'healthy' },
      message: String,
    },
    elasticsearch: {
      status: { type: String, enum: ['healthy', 'warning', 'critical'], default: 'healthy' },
      message: String,
    },
    webserver: {
      status: { type: String, enum: ['healthy', 'warning', 'critical'], default: 'healthy' },
      message: String,
    },
    ingestion: {
      status: { type: String, enum: ['healthy', 'warning', 'critical'], default: 'healthy' },
      message: String,
    },
  },
  uptime: {
    type: Number,
    min: 0,
    max: 100,
    default: 99.9,
  },
  responseTime: {
    type: Number,
    default: 150, // ms
  },
  activeConnections: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
systemStatusSchema.index({ timestamp: -1 });

// Cleanup old status (keep 7 days)
systemStatusSchema.post('save', async function() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await this.constructor.deleteMany({
    timestamp: { $lt: sevenDaysAgo }
  });
});

const SystemStatus = mongoose.model('SystemStatus', systemStatusSchema);

export default SystemStatus;
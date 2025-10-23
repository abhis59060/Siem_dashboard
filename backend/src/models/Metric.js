// src/models/Metric.js
import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['system', 'security', 'performance', 'compliance'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // System Metrics
  uptime: {
    type: Number,
    min: 0,
    max: 100,
    default: 99.9,
  },
  totalEvents: {
    type: Number,
    default: 0,
  },
  eventsPerSecond: {
    type: Number,
    default: 0,
  },
  threatsBlocked: {
    type: Number,
    default: 0,
  },
  // Security Metrics
  detectionRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 95,
  },
  falsePositiveRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 2.5,
  },
  avgResponseTime: {
    type: Number,
    default: 0, // in seconds
  },
  threatScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 75,
  },
  complianceScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 92,
  },
  // Performance Metrics
  cpuUsage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  memoryUsage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  diskUsage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  responseTime: {
    type: Number,
    default: 0, // in ms
  },
  // Compliance
  violations: {
    type: Number,
    default: 0,
  },
  auditPassRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 98,
  },
}, {
  timestamps: true,
});

// Indexes for time-series queries
metricSchema.index({ type: 1, timestamp: -1 });
metricSchema.index({ timestamp: -1 });

// Cleanup old metrics (keep 30 days)
metricSchema.post('save', async function(doc) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await this.constructor.deleteMany({
    timestamp: { $lt: thirtyDaysAgo }
  });
});

const Metric = mongoose.model('Metric', metricSchema);

export default Metric;
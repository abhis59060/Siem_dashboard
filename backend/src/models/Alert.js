// src/models/Alert.js
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['active', 'investigating', 'resolved', 'dismissed', 'deleted'],
    default: 'active',
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  sourceIP: {
    type: String,
    trim: true,
  },
  destinationIP: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['intrusion', 'malware', 'phishing', 'ddos', 'unauthorized_access', 'compliance', 'other'],
    default: 'other',
  },
  type: {
    type: String,
    enum: ['network', 'host', 'application', 'cloud', 'email'],
    default: 'network',
  },
  location: {
    country: String,
    city: String,
    coordinates: {
      lat: Number,
      lon: Number,
    },
  },
  userAffected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: [{
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  evidence: [String], // URLs or file paths
  ruleId: String, // SIEM rule that triggered this alert
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
  deletedAt: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Index for fast queries
alertSchema.index({ status: 1 });
alertSchema.index({ severity: 1 });
alertSchema.index({ timestamp: -1 });
alertSchema.index({ sourceIP: 1 });
alertSchema.index({ category: 1 });
alertSchema.index({ 'location.country': 1 });

// Auto-delete old alerts (cleanup job)
alertSchema.post('save', async function(doc) {
  // Cleanup logic can be added here
});

// Virtual for formatted timestamp
alertSchema.virtual('formattedTime').get(function() {
  return this.timestamp.toLocaleString();
});

// Pre-save middleware for validation
alertSchema.pre('save', function(next) {
  if (this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  next();
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
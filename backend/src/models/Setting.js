// src/models/Setting.js
import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  autoRefresh: {
    type: Boolean,
    default: true,
  },
  refreshInterval: {
    type: Number,
    min: 1000,
    max: 60000,
    default: 5000, // 5 seconds
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'dark',
  },
  notifications: {
    email: { type: Boolean, default: true },
    browser: { type: Boolean, default: true },
    sound: { type: Boolean, default: true },
  },
  alertSeverityFilter: [{
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: ['low', 'medium', 'high', 'critical'],
  }],
  dashboardWidgets: [{
    type: String,
    enum: ['stats', 'recentAlerts', 'threatMap', 'metrics'],
    default: ['stats', 'recentAlerts'],
  }],
  language: {
    type: String,
    default: 'en',
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
}, {
  timestamps: true,
});

// Indexes
settingSchema.index({ userId: 1 });

// Virtual for notification count
settingSchema.virtual('notificationCount').get(function() {
  return Object.values(this.notifications).filter(Boolean).length;
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
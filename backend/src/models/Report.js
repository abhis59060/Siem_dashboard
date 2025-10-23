// src/models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom', 'incident'],
    required: true,
  },
  period: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  filters: {
    severity: [String],
    category: [String],
    source: [String],
  },
  summary: {
    totalAlerts: Number,
    bySeverity: {
      low: Number,
      medium: Number,
      high: Number,
      critical: Number,
    },
    byCategory: {
      type: Map,
      of: Number,
    },
    topSources: [{
      source: String,
      count: Number,
    }],
  },
  alerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert',
  }],
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  format: {
    type: String,
    enum: ['pdf', 'csv', 'json'],
    default: 'pdf',
  },
  filePath: {
    type: String, // Path to generated file
  },
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'completed',
  },
  downloadUrl: String,
  metadata: {
    totalSize: Number,
    pageCount: Number,
  },
}, {
  timestamps: true,
});

// Indexes
reportSchema.index({ 'period.startDate': -1 });
reportSchema.index({ generatedBy: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ type: 1 });

// Virtual for report duration
reportSchema.virtual('durationDays').get(function() {
  return Math.round(
    (this.period.endDate - this.period.startDate) / (1000 * 60 * 60 * 24)
  );
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
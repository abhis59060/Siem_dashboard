// src/controllers/alertsController.js
import { logger } from '../utils/logger.js';
import Alert from '../models/Alert.js';

// Get all alerts with filters
export const getAlerts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      severity, 
      status, 
      source,
      startDate,
      endDate 
    } = req.query;

    const skip = (page - 1) * limit;
    const filter = { status: { $ne: 'deleted' } };

    // Apply filters
    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (startDate) filter.timestamp = { ...filter.timestamp, $gte: new Date(startDate) };
    if (endDate) filter.timestamp = { ...filter.timestamp, $lte: new Date(endDate) };

    const [alerts, total] = await Promise.all([
      Alert.find(filter)
        .sort({ timestamp: -1 })
        .limit(limit)
        .skip(skip),
      Alert.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        alerts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    logger.error('Get alerts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch alerts' });
  }
};

// Create new alert (for real-time ingestion)
export const createAlert = async (req, res) => {
  try {
    const alertData = {
      ...req.body,
      timestamp: new Date(),
      status: 'active',
    };

    const alert = new Alert(alertData);
    await alert.save();

    // Emit real-time notification (if WebSocket connected)
    req.io?.emit('newAlert', alert);

    logger.info(`New alert created: ${alert._id}`);
    res.status(201).json({ success: true, data: alert });
  } catch (error) {
    logger.error('Create alert error:', error);
    res.status(500).json({ success: false, message: 'Failed to create alert' });
  }
};

// Update alert status (resolve, dismiss, etc.)
export const updateAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const alert = await Alert.findByIdAndUpdate(
      id,
      { 
        status, 
        notes: notes || [],
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    logger.info(`Alert ${id} updated to status: ${status}`);
    res.json({ success: true, data: alert });
  } catch (error) {
    logger.error('Update alert error:', error);
    res.status(500).json({ success: false, message: 'Failed to update alert' });
  }
};

// Delete alert (soft delete)
export const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    
    const alert = await Alert.findByIdAndUpdate(
      id,
      { status: 'deleted', deletedAt: new Date() },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    logger.info(`Alert ${id} deleted`);
    res.json({ success: true, message: 'Alert deleted successfully' });
  } catch (error) {
    logger.error('Delete alert error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete alert' });
  }
};
// src/controllers/settingsController.js
import { logger } from '../utils/logger.js';
import Setting from '../models/Setting.js'; // You'll need to create this model

// Get user settings
export const getSettings = async (req, res) => {
  try {
    const userId = req.user?.id; // From auth middleware

    let settings = await Setting.findOne({ userId });
    
    if (!settings) {
      // Default settings
      settings = new Setting({
        userId,
        autoRefresh: true,
        refreshInterval: 5000,
        theme: 'dark',
        notifications: true,
        alertSeverityFilter: ['low', 'medium', 'high', 'critical'],
      });
      await settings.save();
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    logger.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
};

// Update user settings
export const updateSettings = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { autoRefresh, refreshInterval, theme, notifications, alertSeverityFilter } = req.body;

    // Validation
    if (refreshInterval && (refreshInterval < 1000 || refreshInterval > 60000)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Refresh interval must be between 1-60 seconds' 
      });
    }

    const settings = await Setting.findOneAndUpdate(
      { userId },
      {
        autoRefresh,
        refreshInterval,
        theme,
        notifications,
        alertSeverityFilter,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    logger.info(`Settings updated for user: ${userId}`);
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error('Update settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};

// Get global app settings (admin only)
export const getGlobalSettings = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const settings = await Setting.findOne({ userId: 'global' });
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error('Get global settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch global settings' });
  }
};
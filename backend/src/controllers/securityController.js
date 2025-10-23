// src/controllers/securityController.js
import { logger } from '../utils/logger.js';
import Metric from '../models/Metric.js';
import SystemStatus from '../models/SystemStatus.js'; // You'll need this model

// Get security metrics
export const getSecurityMetrics = async (req, res) => {
  try {
    const metrics = await Metric.find()
      .sort({ timestamp: -1 })
      .limit(24); // Last 24 hours

    const latest = metrics[0];
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length;

    res.json({
      success: true,
      data: {
        detectionRate: latest?.detectionRate || 95,
        falsePositiveRate: latest?.falsePositiveRate || 2.5,
        avgResponseTime: Math.round(avgResponseTime),
        threatScore: latest?.threatScore || 75,
        complianceScore: latest?.complianceScore || 92,
        historical: metrics.map(m => ({
          timestamp: m.timestamp,
          detectionRate: m.detectionRate,
          threatScore: m.threatScore,
        })),
      },
    });
  } catch (error) {
    logger.error('Security metrics error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch security metrics' });
  }
};

// Get system status
export const getSystemStatus = async (req, res) => {
  try {
    const status = await SystemStatus.findOne().sort({ timestamp: -1 });

    res.json({
      success: true,
      data: {
        overallStatus: status?.overallStatus || 'healthy',
        components: {
          database: status?.components.database || 'healthy',
          elasticsearch: status?.components.elasticsearch || 'healthy',
          webserver: status?.components.webserver || 'healthy',
          ingestion: status?.components.ingestion || 'healthy',
        },
        uptime: status?.uptime || 99.9,
        lastChecked: status?.timestamp || new Date(),
      },
    });
  } catch (error) {
    logger.error('System status error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch system status' });
  }
};

// Update system status (health check endpoint)
export const updateSystemStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const statusData = {
      ...req.body,
      timestamp: new Date(),
    };

    const status = new SystemStatus(statusData);
    await status.save();

    logger.info('System status updated');
    res.json({ success: true, data: status });
  } catch (error) {
    logger.error('Update system status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update system status' });
  }
};
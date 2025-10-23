// src/controllers/dashboardController.js
import { logger } from '../utils/logger.js';
import Alert from '../models/Alert.js';
import Metric from '../models/Metric.js';

// Get dashboard statistics (for StatCards)
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      Alert.countDocuments({ status: 'active' }),
      Alert.countDocuments({ severity: { $in: ['high', 'critical'] } }),
      Alert.countDocuments({ resolved: false }),
      Metric.findOne({ type: 'system' }).sort({ timestamp: -1 }),
    ]);

    const [activeAlerts, highSeverityAlerts, unresolvedAlerts, systemMetrics] = stats;

    res.json({
      success: true,
      data: {
        activeAlerts,
        highSeverityAlerts,
        unresolvedAlerts,
        systemUptime: systemMetrics?.uptime || 99.9,
        totalEvents: systemMetrics?.totalEvents || 0,
        threatsBlocked: systemMetrics?.threatsBlocked || 0,
      },
    });
  } catch (error) {
    logger.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
};

// Get recent alerts for dashboard table
export const getRecentAlerts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const alerts = await Alert.find({ status: 'active' })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .select('title severity source timestamp status');

    const total = await Alert.countDocuments({ status: 'active' });

    res.json({
      success: true,
      data: {
        alerts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    logger.error('Recent alerts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recent alerts' });
  }
};

// Get threat trends data (for charts)
export const getThreatTrends = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const trends = await Alert.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
          status: 'active',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' },
          },
          count: { $sum: 1 },
          severity: { $first: '$severity' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]);

    res.json({
      success: true,
      data: trends.map(trend => ({
        date: `${trend._id.year}-${String(trend._id.month).padStart(2, '0')}-${String(trend._id.day).padStart(2, '0')}`,
        count: trend.count,
      })),
    });
  } catch (error) {
    logger.error('Threat trends error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch threat trends' });
  }
};
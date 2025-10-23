// src/services/siemService.js
import { logger } from '../utils/logger.js';
import Alert from '../models/Alert.js';
import Metric from '../models/Metric.js';

export class SIEMService {
  // Generate mock alert for testing
  static generateMockAlert() {
    const severities = ['low', 'medium', 'high', 'critical'];
    const categories = ['intrusion', 'malware', 'phishing', 'ddos'];
    const sources = ['Firewall', 'IDS', 'Antivirus', 'WAF'];

    return {
      title: `Mock ${categories[Math.floor(Math.random() * categories.length)]} Alert`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      sourceIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
    };
  }

  // Ingest real-time alert
  static async ingestAlert(alertData, io) {
    try {
      const alert = new Alert({
        ...alertData,
        timestamp: new Date(),
      });
      await alert.save();

      // Emit to WebSocket
      if (io) io.emit('newAlert', alert);

      // Update metrics
      await this.updateMetrics();

      logger.info(`Alert ingested: ${alert._id}`);
      return alert;
    } catch (error) {
      logger.error('Ingest alert error:', error);
      throw error;
    }
  }

  // Update system metrics
  static async updateMetrics() {
    const metric = new Metric({
      type: 'system',
      uptime: 99.9,
      totalEvents: Math.floor(Math.random() * 10000),
      threatsBlocked: Math.floor(Math.random() * 100),
      detectionRate: 95 + Math.random() * 5,
    });
    await metric.save();
  }

  // Generate sample data (for development)
  static async generateSampleData(count = 50) {
    const alerts = [];
    for (let i = 0; i < count; i++) {
      alerts.push(this.generateMockAlert());
    }

    await Alert.insertMany(alerts);
    logger.info(`Generated ${count} sample alerts`);
  }
}

export default SIEMService;
// src/controllers/reportsController.js
import { logger } from '../utils/logger.js';
import Alert from '../models/Alert.js';
import pdf from 'pdfkit';
import { promisify } from 'util';
import fs from 'fs';

const pipelineAsync = promisify(pdf);

// Generate report PDF
export const generatePDFReport = async (req, res) => {
  try {
    const { startDate, endDate, severity } = req.query;
    const filter = { 
      timestamp: { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      },
      status: { $ne: 'deleted' }
    };

    if (severity) filter.severity = severity;

    const alerts = await Alert.find(filter).sort({ timestamp: -1 });
    const total = alerts.length;

    // Create PDF
    const doc = new pdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=siem-report-${new Date().toISOString().split('T')[0]}.pdf`);

    doc.pipe(res);

    // Cover page
    doc.fontSize(24).text('SIEM Security Report', 50, 50)
      .fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, 50, 80)
      .fontSize(12).text(`Period: ${startDate} to ${endDate}`, 50, 100)
      .fontSize(12).text(`Total Alerts: ${total}`, 50, 120);

    // Content
    let yPosition = 200;
    doc.fontSize(16).text('Alerts Summary', 50, yPosition);
    yPosition += 40;

    alerts.forEach((alert, index) => {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 50;
      }

      doc.fontSize(12)
        .fillColor(alert.severity === 'critical' ? '#dc2626' : 
                  alert.severity === 'high' ? '#f97316' : '#10b981')
        .text(`${index + 1}. ${alert.title}`, 50, yPosition)
        .fillColor('#000')
        .fontSize(10)
        .text(`Severity: ${alert.severity}`, 70, yPosition + 15)
        .text(`Source: ${alert.source}`, 200, yPosition + 15)
        .text(`Time: ${alert.timestamp.toLocaleString()}`, 350, yPosition + 15)
        .text(`Status: ${alert.status}`, 50, yPosition + 30);

      yPosition += 50;
    });

    doc.end();
    logger.info(`PDF report generated: ${total} alerts`);
  } catch (error) {
    logger.error('PDF generation error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate PDF report' });
  }
};

// Generate CSV report
export const generateCSVReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { 
      timestamp: { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      }
    };

    const alerts = await Alert.find(filter).sort({ timestamp: -1 });

    const csv = [
      ['ID', 'Title', 'Severity', 'Source', 'Status', 'Timestamp'],
      ...alerts.map(alert => [
        alert._id,
        `"${alert.title}"`,
        alert.severity,
        alert.source,
        alert.status,
        alert.timestamp.toISOString(),
      ])
    ].map(row => row.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=siem-report-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);

    logger.info(`CSV report generated: ${alerts.length} alerts`);
  } catch (error) {
    logger.error('CSV generation error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate CSV report' });
  }
};

// Get report summary (for preview)
export const getReportSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { 
      timestamp: { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      }
    };

    const summary = await Alert.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: await Alert.countDocuments(filter),
        bySeverity: summary,
      },
    });
  } catch (error) {
    logger.error('Report summary error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate report summary' });
  }
};
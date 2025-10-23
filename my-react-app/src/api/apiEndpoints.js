// src/api/apiEndpoints.js
const API_BASE = '/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE}/auth/login`,
  
  // Dashboard
  DASHBOARD_STATS: `${API_BASE}/dashboard/stats`,
  RECENT_ALERTS: `${API_BASE}/dashboard/alerts`,
  THREAT_TRENDS: `${API_BASE}/dashboard/trends`,
  
  // Alerts
  ALERTS: `${API_BASE}/alerts`,
  
  // Reports
  REPORT_SUMMARY: `${API_BASE}/reports/summary`,
  REPORT_PDF: `${API_BASE}/reports/pdf`,
  REPORT_CSV: `${API_BASE}/reports/csv`,
  
  // Settings
  SETTINGS: `${API_BASE}/settings`,
  
  // Security
  SECURITY_METRICS: `${API_BASE}/security/metrics`,
  SYSTEM_STATUS: `${API_BASE}/security/status`,
};
// src/api/api.js
import { API_ENDPOINTS } from './apiEndpoints.js';

class API {
  constructor() {
    this.baseURL = '/api';
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      ...options,
      headers: config.headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    return this.request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request(API_ENDPOINTS.DASHBOARD_STATS);
  }

  async getRecentAlerts(page = 1, limit = 10) {
    return this.request(`${API_ENDPOINTS.RECENT_ALERTS}?page=${page}&limit=${limit}`);
  }

  async getThreatTrends(days = 7) {
    return this.request(`${API_ENDPOINTS.THREAT_TRENDS}?days=${days}`);
  }

  // Alerts
  async getAlerts(page = 1, limit = 20, filters = {}) {
    let url = `${API_ENDPOINTS.ALERTS}?page=${page}&limit=${limit}`;
    Object.keys(filters).forEach(key => {
      if (filters[key]) url += `&${key}=${filters[key]}`;
    });
    return this.request(url);
  }

  // Reports
  async getReportSummary(startDate, endDate) {
    return this.request(`${API_ENDPOINTS.REPORT_SUMMARY}?startDate=${startDate}&endDate=${endDate}`);
  }

  // Settings
  async getSettings() {
    return this.request(API_ENDPOINTS.SETTINGS);
  }

  async updateSettings(settings) {
    return this.request(API_ENDPOINTS.SETTINGS, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Security
  async getSecurityMetrics() {
    return this.request(API_ENDPOINTS.SECURITY_METRICS);
  }

  async getSystemStatus() {
    return this.request(API_ENDPOINTS.SYSTEM_STATUS);
  }
}

export default new API();
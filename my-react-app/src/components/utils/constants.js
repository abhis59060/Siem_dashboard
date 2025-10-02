// Severity Levels
export const SEVERITY_LEVELS = ["Low", "Medium", "High", "Critical"];

// Status Colors
export const STATUS_COLORS = {
  Low: "bg-green-600 text-white",
  Medium: "bg-yellow-500 text-black",
  High: "bg-red-600 text-white",
  Critical: "bg-purple-700 text-white",
};

// Default API Endpoints
export const API_ENDPOINTS = {
  ALERTS: "/api/alerts",
  METRICS: "/api/metrics",
  THREATS: "/api/threats",
  SYSTEM_STATUS: "/api/system-status",
};

// Dashboard refresh interval in milliseconds
export const REFRESH_INTERVAL = 5000;

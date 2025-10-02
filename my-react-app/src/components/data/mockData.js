export const alertsData = [
  {
    id: 1,
    time: "2025-10-02T10:35:21Z",
    sourceIP: "192.168.1.12",
    destinationIP: "10.23.45.67",
    severity: "High",
    description: "Multiple failed login attempts detected.",
  },
  {
    id: 2,
    time: "2025-10-02T11:02:48Z",
    sourceIP: "172.16.5.5",
    destinationIP: "192.168.100.4",
    severity: "Medium",
    description: "Unusual port scanning activity.",
  },
  {
    id: 3,
    time: "2025-10-02T11:15:22Z",
    sourceIP: "10.0.0.8",
    destinationIP: "8.8.8.8",
    severity: "Low",
    description: "Suspicious DNS query.",
  },
];

export const threatTrendsData = [
  { month: "Jan", threats: 400 },
  { month: "Feb", threats: 300 },
  { month: "Mar", threats: 200 },
  { month: "Apr", threats: 278 },
  { month: "May", threats: 189 },
  { month: "Jun", threats: 239 },
];

export const networkTrafficData = [
  { name: "Internal", value: 400 },
  { name: "External", value: 300 },
  { name: "VPN", value: 300 },
  { name: "Unknown", value: 200 },
];

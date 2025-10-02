import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    time: "10:35:21",
    source: "192.168.1.12",
    destination: "10.23.45.67",
    severity: "High",
    description: "Multiple failed login attempts detected.",
  },
  {
    id: 2,
    time: "11:02:48",
    source: "172.16.5.5",
    destination: "192.168.100.4",
    severity: "Medium",
    description: "Unusual port scanning activity.",
  },
  {
    id: 3,
    time: "11:15:22",
    source: "10.0.0.8",
    destination: "8.8.8.8",
    severity: "Low",
    description: "Suspicious DNS query.",
  },
];

function severityColor(severity) {
  switch (severity) {
    case "High": return "bg-red-600 text-white";
    case "Medium": return "bg-yellow-500 text-black";
    case "Low": return "bg-green-600 text-white";
    default: return "bg-gray-500";
  }
}

export default function AlertsTable() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96">
      <h2 className="text-lg font-semibold mb-3 text-white">Security Alerts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Source IP</TableHead>
            <TableHead>Destination IP</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map(({ id, time, source, destination, severity, description }) => (
            <TableRow key={id} className="hover:bg-gray-700">
              <TableCell>{time}</TableCell>
              <TableCell>{source}</TableCell>
              <TableCell>{destination}</TableCell>
              <TableCell>
                <Badge className={severityColor(severity)}>{severity}</Badge>
              </TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

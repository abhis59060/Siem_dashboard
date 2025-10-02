import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const systems = [
  { name: "Firewall", status: 90 },
  { name: "IDS", status: 75 },
  { name: "Antivirus", status: 95 },
  { name: "SIEM Server", status: 80 },
];

export default function SystemStatus() {
  return (
    <Card className="p-6 bg-gray-800 border-none">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      <div className="space-y-4">
        {systems.map(({ name, status }) => (
          <div key={name}>
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-200">
              <span>{name}</span>
              <span>{status}%</span>
            </div>
            <Progress value={status} className="h-3 rounded-full bg-gray-700" />
          </div>
        ))}
      </div>
    </Card>
  );
}

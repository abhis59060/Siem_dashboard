import { Card } from "@/components/ui/card";

const cards = [
  { title: "Active Threats", value: 25, color: "text-red-400" },
  { title: "Blocked Attacks", value: 1123, color: "text-green-400" },
  { title: "System Health", value: "99.9%", color: "text-blue-400" },
  { title: "Events Processed", value: "28K", color: "text-yellow-400" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ title, value, color }) => (
        <Card key={title} className="p-6 bg-gray-800 border-none">
          <p className={`text-sm font-medium ${color} mb-2`}>{title}</p>
          <p className="text-3xl font-extrabold">{value}</p>
        </Card>
      ))}
    </div>
  );
}

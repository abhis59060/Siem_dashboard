import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const initialData = [
  { name: "Internal", value: 400 },
  { name: "External", value: 300 },
  { name: "VPN", value: 300 },
  { name: "Unknown", value: 200 },
];

export default function NetworkChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((oldData) =>
        oldData.map((entry) => ({
          ...entry,
          value: Math.max(100, Math.min(600, entry.value + (Math.random() * 50 - 25))),
        }))
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full h-64">
      <h2 className="text-lg font-semibold mb-3 text-white">Network Traffic Distribution</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const initialData = [
  { month: "Jan", threats: 400 },
  { month: "Feb", threats: 300 },
  { month: "Mar", threats: 200 },
  { month: "Apr", threats: 278 },
  { month: "May", threats: 189 },
  { month: "Jun", threats: 239 },
];

export default function ThreatTrendsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((oldData) =>
        oldData.map((item) => ({
          ...item,
          threats: Math.max(100, Math.min(500, item.threats + (Math.random() * 40 - 20))),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full h-64">
      <h2 className="text-lg font-semibold mb-3 text-white">Threat Trends Over Time</h2>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <XAxis dataKey="month" stroke="#82ca9d" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="threats" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

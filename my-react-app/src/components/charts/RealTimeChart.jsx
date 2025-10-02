import { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RealTimeChart() {
  const [data, setData] = useState([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((oldData) => {
        const newData = [...oldData];
        if (newData.length > 20) newData.shift();

        newData.push({
          time: timeRef.current++,
          value: Math.floor(Math.random() * 100) + 20,
        });

        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full h-64">
      <h2 className="text-lg font-semibold mb-3 text-white">Real-Time Network Traffic</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

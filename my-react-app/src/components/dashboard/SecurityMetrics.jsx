import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialData = [
  { name: 'Jan', high: 100, medium: 80, low: 60 },
  { name: 'Feb', high: 50, medium: 40, low: 30 },
  { name: 'Mar', high: 150, medium: 100, low: 50 },
  { name: 'Apr', high: 80, medium: 60, low: 40 },
  { name: 'May', high: 120, medium: 90, low: 60 },
  { name: 'Jun', high: 200, medium: 120, low: 80 },
];

export default function SecurityMetrics() {
  const [chartData, setChartData] = useState(initialData);

  // Simulate dynamic changes
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((oldData) =>
        oldData.map((d) => ({
          ...d,
          high: Math.max(50, Math.min(250, d.high + (Math.random() * 20 - 10))),
          medium: Math.max(30, Math.min(150, d.medium + (Math.random() * 15 - 7))),
          low: Math.max(20, Math.min(100, d.low + (Math.random() * 10 - 5))),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        label: 'High Risk',
        data: chartData.map((d) => d.high),
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red gradient
        borderRadius: 8,
      },
      {
        label: 'Medium Risk',
        data: chartData.map((d) => d.medium),
        backgroundColor: 'rgba(245, 158, 11, 0.7)', // Yellow
        borderRadius: 8,
      },
      {
        label: 'Low Risk',
        data: chartData.map((d) => d.low),
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Green
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1800, // Professional, smooth duration
      easing: 'easeInOutExpo', // Expo easing for fluid growth
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#e5e7eb' } },
      tooltip: { backgroundColor: 'rgba(31, 41, 55, 0.9)', cornerRadius: 6 },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#e5e7eb' },
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#e5e7eb' },
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 5,
      },
    },
  };

  return (
    <Card className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-white">Security Attack Trends</h2>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

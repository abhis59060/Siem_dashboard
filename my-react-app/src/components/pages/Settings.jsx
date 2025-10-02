import { useState } from "react";

export default function Settings() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
            className="rounded"
          />
          <span>Enable Auto Refresh</span>
        </label>
      </div>

      <div>
        <label>
          Refresh Interval (ms):
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="ml-2 w-24 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-gray-100 focus:outline-none"
          />
        </label>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";

// Simulated WebSocket real-time data hook
export function useRealTimeData(initialData = []) {
  const [data, setData] = useState(initialData);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://your-websocket-api.example.com");

    ws.current.onmessage = (event) => {
      const newDataPoint = JSON.parse(event.data);
      setData((oldData) => [...oldData.slice(-99), newDataPoint]);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return data;
}

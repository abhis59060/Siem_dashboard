import { useEffect, useRef } from "react";

export default function ThreatMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;

    // Simple animated circles simulating global threats
    const circles = [...Array(30)].map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 4 + 2,
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
      circles.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();

        c.x += c.dx;
        c.y += c.dy;

        if (c.x + c.radius > width || c.x - c.radius < 0) c.dx = -c.dx;
        if (c.y + c.radius > height || c.y - c.radius < 0) c.dy = -c.dy;
      });
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      // Clean up animation frame if needed
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full h-64 overflow-hidden">
      <h2 className="text-lg font-semibold mb-3 text-white">Threat Map</h2>
      <canvas ref={canvasRef} className="w-full h-56 rounded-md" />
    </div>
  );
}

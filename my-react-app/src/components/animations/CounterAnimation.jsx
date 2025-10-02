import React, { useState, useEffect } from "react";

export default function CounterAnimation({ from = 0, to, duration = 2000, className = "" }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const current = Math.min(
        from + ((to - from) * progress) / duration,
        to
      );
      setCount(Math.floor(current));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span className={className}>{count}</span>;
}

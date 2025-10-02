import React from "react";

export default function PulseAnimation({ children, className = "", duration = "2s" }) {
  return (
    <div
      style={{ animationDuration: duration }}
      className={`animate-pulse ${className}`}
    >
      {children}
    </div>
  );
}

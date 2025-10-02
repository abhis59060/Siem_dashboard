import React from "react";

export default function GlowEffect({ children, className = "", color = "blue" }) {
  const glowColor = {
    blue: "shadow-blue-500/50",
    red: "shadow-red-500/50",
    green: "shadow-green-500/50",
    yellow: "shadow-yellow-400/50",
  };

  return (
    <div className={`rounded-md shadow-lg ${glowColor[color] || glowColor.blue} ${className}`}>
      {children}
    </div>
  );
}

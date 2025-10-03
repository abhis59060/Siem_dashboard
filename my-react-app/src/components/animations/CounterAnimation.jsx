import React, { useState, useEffect } from "react";

export default function CounterAnimation({ from = 0, to, duration = 2000, className = "" }) {
  // Use a string state to hold the formatted number with decimals/commas
  const [displayValue, setDisplayValue] = useState(String(from)); 
  
  // Helper to determine the required decimal places (e.g., for 99.9)
  const decimalPlaces = to.toString().includes('.') ? 1 : 0;
  
  // Function to format the number
  const formatNumber = (num) => {
    // 1. Handle decimals
    let formatted = num.toFixed(decimalPlaces); 
    
    // 2. Handle commas (only for integers, or before adding the final suffix)
    if (decimalPlaces === 0 && num >= 1000) {
      formatted = Math.round(num).toLocaleString();
    }
    
    return formatted;
  };


  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      // Calculate the raw current number
      const current = Math.min(
        from + ((to - from) * progress) / duration,
        to
      );
      
      // Update the display state with the formatted number
      setDisplayValue(formatNumber(current));
      
      // Continue animation until time is up
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    
    // Start animation
    requestAnimationFrame(step);

    // Clean up function (optional but good practice)
    return () => {
        // Since step uses requestAnimationFrame, we don't strictly need a cleanup here, 
        // but it's good practice for general animation components.
    };
  }, [from, to, duration, decimalPlaces]);

  return <span className={className}>{displayValue}</span>;
}
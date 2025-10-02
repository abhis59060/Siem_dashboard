import { useState, useEffect } from "react";

// Control animation states globally or per component
export function useAnimations() {
  const [isAnimating, setAnimating] = useState(true);

  function toggleAnimation() {
    setAnimating((prev) => !prev);
  }

  useEffect(() => {
    // Optional: Any side-effects related to animation state
  }, [isAnimating]);

  return { isAnimating, toggleAnimation };
}

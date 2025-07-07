"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  target?: string; // CSS selector for the content to track
}

export default function ReadingProgress({
  target = ".prose",
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = targetElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate progress based on how much of the target element has been scrolled through
      const elementStart = elementTop;
      const elementEnd = elementTop + elementHeight - windowHeight;
      const scrollProgress =
        (scrollTop - elementStart) / (elementEnd - elementStart);

      setProgress(Math.min(100, Math.max(0, scrollProgress * 100)));
    };

    const throttledUpdateProgress = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", throttledUpdateProgress);
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", throttledUpdateProgress);
    };
  }, [target]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-orange-200 to-orange-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./../app/globals.css"; // Assuming the CSS is in this file
import LoadingDot from "@/images/loaddot";

interface ProgressBarProps {
  duration: number; // Explicitly define the type as a number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration }) => {
  const [progress, setProgress] = useState<number>(0); // Type for state is also number

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;

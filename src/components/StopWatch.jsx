import React, { useEffect, useState } from "react";

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // Update every 100 milliseconds
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartStop}>{running ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

function formatTime(milliseconds) {
  const mins = Math.floor(milliseconds / 60000)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor((milliseconds % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const msecs = (milliseconds % 1000).toString().padStart(3, "0");
  return `${mins}:${secs}:${msecs}`;
}

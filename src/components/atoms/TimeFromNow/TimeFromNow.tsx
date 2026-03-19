"use client";
import { useEffect, useState } from "react";
import ClockIcon from "public/icons/clock.svg";
import "./time-from-now.scss";

const ALERT_THRESHOLD_MS = 10 * 60 * 1000;

const formatElapsed = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};

type TimeFromNowProps = {
  date: Date;
};

export const TimeFromNow = ({ date }: TimeFromNowProps) => {
  const [elapsed, setElapsed] = useState(() => Date.now() - date.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - date.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const isOverdue = elapsed >= ALERT_THRESHOLD_MS;

  return (
    <span
      className={`body-text time-from-now${isOverdue ? " time-from-now--overdue" : ""}`}
    >
      <ClockIcon className="time-from-now__icon" />
      {formatElapsed(elapsed)}
    </span>
  );
};

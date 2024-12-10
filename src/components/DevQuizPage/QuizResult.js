"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuizResult = ({
  selectedTopics,
  totalQuestions,
  correctAnswers,
  elapsedTime,
  onRestart,
  onLeave,
}) => {
  const finalPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Animate from 0% to finalPercentage over 3 seconds
  useEffect(() => {
    const end = parseFloat(finalPercentage);
    const duration = 3000; // 3 seconds
    const stepTime = 50; // update every 50ms
    const increment = end / (duration / stepTime);

    const intervalId = setInterval(() => {
      setDisplayPercentage((prev) => {
        const nextVal = prev + increment;
        if (nextVal >= end) {
          clearInterval(intervalId);
          return end;
        }
        return nextVal;
      });
    }, stepTime);

    return () => clearInterval(intervalId);
  }, [finalPercentage]);

  const formatElapsedTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const getColor = (percentage) => {
    if (percentage < 50) return "#ef4444"; // Red
    if (percentage < 60) return "#f97316"; // Orange
    if (percentage < 75) return "#eab308"; // Yellow
    return "#22c55e"; // Green
  };

  const color = getColor(displayPercentage);

  return (
    <>
      <div className="w-full center pb-4 border-b border-accent-border mb-1">
        <h2>Your Results</h2>
      </div>
      {/* Selected Topics */}
      <div className="w-full center flex-col gap-2">
        <p className="text-text-secondary">Topics</p>
        <ul className="center gap-2 flex-wrap">
          {selectedTopics.map((topic, index) => (
            <li key={index} className="tag-primary">
              {topic.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Percentage with circular progress */}
      <div className="w-[180px] h-[180px] my-4">
        <CircularProgressbar
          value={displayPercentage}
          text={`${displayPercentage.toFixed(1)}%`}
          styles={{
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              stroke: color,
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",
              // Customize transition animation
              transition: "stroke-dashoffset 0.5s ease 0s",
              strokeWidth: "3px",
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: "#d6d6d6",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",
              strokeWidth: "3px",
            },
            // Customize the text
            text: {
              // Text color
              fill: color,
              // Text size
              fontSize: "14px",
            },
          }}
        />
      </div>
      {/* Score */}
      <div>
        <h3 className="text-xl font-normal text-text-primary -mt-2">
          <span className="font-bold">{correctAnswers}</span> out of{" "}
          <span className="font-bold">{totalQuestions}</span>
        </h3>
      </div>
      {/* Time Taken */}
      <div className="center flex-col">
        <p className="text-text-secondary">Time Taken</p>
        <p className="text-text-primary">{formatElapsedTime(elapsedTime)}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={onLeave}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          Leave Quiz
        </button>
        <Button
          onClick={onRestart}
          className="btn-primary !bg-accent-extra !text-white"
        >
          Start Over
        </Button>
      </div>
    </>
  );
};

export default QuizResult;

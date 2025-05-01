"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

/**
 * QuizResult Component
 *
 * Displays the quiz results, including:
 * - Selected topics
 * - Percentage score with an animated circular progress bar
 * - Correct answers count
 * - Elapsed time
 * - Options to restart or leave the quiz
 *
 * Props:
 * - selectedTopics: Array of topics selected for the quiz.
 * - totalQuestions: Total number of questions answered.
 * - correctAnswers: Number of correct answers.
 * - elapsedTime: Time taken to complete the quiz (in seconds).
 * - onRestart: Function to restart the quiz.
 * - onLeave: Function to leave the quiz.
 */

const QuizResult = ({
  selectedTopics,
  totalQuestions,
  correctAnswers,
  elapsedTime,
  onRestart,
  onLeave,
  t,
}) => {
  const finalPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Animate from 0% to finalPercentage over 2 seconds
  useEffect(() => {
    const end = parseFloat(finalPercentage);
    const duration = 3000; // 2 seconds
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
      <div className="w-full center pb-3 md:pb-4 border-b border-accent-border mb-4">
        <h2 className="font-semibold  max-[375px]:text-[24px] text-center">
          {t.result.title}
        </h2>
      </div>
      {/* Selected Topics */}
      <div className="max-md:px-4 w-full center flex-col gap-2">
        <p className="text-text-secondary">{t.result.topic}</p>
        <ul className="center gap-2 flex-wrap">
          {selectedTopics.map((topic, index) => (
            <li key={index} className="tag-primary">
              {topic.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Percentage with circular progress */}
      <div className="max-[220px]:w-[100px] w-[180px] max-[220px]:h-[100px] h-[180px] my-4">
        <CircularProgressbar
          value={displayPercentage}
          text={`${displayPercentage.toFixed(1)}%`}
          styles={{
            path: {
              stroke: color,
              strokeLinecap: "butt",
              transition: "stroke-dashoffset 0.5s ease 0s",
              strokeWidth: "3px",
            },
            trail: {
              stroke: "#d6d6d6",
              strokeLinecap: "butt",
              strokeWidth: "3px",
            },
            text: {
              fill: color,
              fontSize: "14px",
            },
          }}
        />
      </div>
      {/* Score */}
      <div className="max-md:px-4">
        <h3 className="text-xl text-center font-normal text-text-primary -mt-2">
          <span className="font-bold">{correctAnswers}</span> {t.result.outOf}{" "}
          <span className="font-bold">{totalQuestions}</span>
        </h3>
      </div>
      {/* Time Taken */}
      <div className="max-md:px-4 center flex-col">
        <p className="text-text-secondary text-center">{t.result.time}</p>
        <p className="text-text-primary text-center">
          {formatElapsedTime(elapsedTime)}
        </p>
      </div>

      {/* Buttons */}
      <div className="max-md:px-4 flex gap-4 mt-4">
        <button
          onClick={onLeave}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          {t.result.leave}
        </button>
        <Button
          onClick={onRestart}
          className="btn-primary !bg-accent-extra !text-white"
        >
          {t.result.restart}
        </Button>
      </div>
    </>
  );
};

export default QuizResult;

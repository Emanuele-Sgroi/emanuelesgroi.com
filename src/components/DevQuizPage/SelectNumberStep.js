"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const SelectNumberStep = ({
  selectedQuestions,
  onCancel,
  onNext,
  onPrevious,
}) => {
  const [questionCounts, setQuestionCounts] = useState(
    selectedQuestions.reduce((acc, topic) => {
      const maxQuestions = topic.questions ? topic.questions.length : 0; // Safeguard for undefined questions
      acc[topic.name] = Math.min(5, maxQuestions); // Default: 5 or the max available
      return acc;
    }, {})
  );

  const handleSliderChange = (topicName, value) => {
    setQuestionCounts((prev) => ({
      ...prev,
      [topicName]: value,
    }));
  };

  const totalQuestions = Object.values(questionCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleNext = () => {
    const finalSelection = selectedQuestions.map((topic) => ({
      ...topic,
      selectedCount: questionCounts[topic.name],
    }));
    onNext(finalSelection); // Pass selected counts to the parent
  };

  return (
    <>
      <div className="w-full center pb-4 border-b border-accent-border mb-4">
        <h2>How many questions?</h2>
      </div>

      <div
        className={`w-full grid ${
          selectedQuestions.length === 1 ? "grid-cols-1" : "grid-cols-2"
        } gap-4`}
      >
        {selectedQuestions.map((topic) => (
          <div
            key={topic.name}
            className="flex flex-col gap-2 border border-accent-border p-4 rounded-md"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">{topic.name}</p>
              <p className="text-sm text-text-secondary">
                {questionCounts[topic.name]} / {topic.questions.length}
              </p>
            </div>
            <Slider
              value={[questionCounts[topic.name]]}
              onValueChange={(value) =>
                handleSliderChange(topic.name, value[0])
              }
              min={1}
              max={topic.questions.length}
              step={1}
            />
          </div>
        ))}
      </div>

      <p className="text-lg font-semibold mt-6">
        Total Questions:{" "}
        <span className="text-accent-extra">{totalQuestions}</span>
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onCancel}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          Cancel
        </button>
        <button
          onClick={onPrevious}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          Previous
        </button>
        <Button
          onClick={handleNext}
          className="btn-primary !bg-accent-extra !text-white"
          disabled={totalQuestions < 1}
        >
          Start Quiz
        </Button>
      </div>
    </>
  );
};

export default SelectNumberStep;

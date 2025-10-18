"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

/**
 * SelectNumberStep Component
 *
 * Allows users to select the number of questions for each chosen topic.
 * - Uses sliders to set question count per topic.
 * - Displays total selected questions.
 * - Provides navigation buttons to cancel, go back, or proceed.
 *
 * Props:
 * - selectedQuestions: Array of topics with available questions.
 * - onCancel: Function to cancel quiz setup.
 * - onNext: Function to proceed with selected question counts.
 * - onPrevious: Function to go back to the topic selection step.
 */

const SelectNumberStep = ({
  selectedQuestions,
  onCancel,
  onNext,
  onPrevious,
  t,
  language,
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
      <div className="w-full center pb-3 md:pb-4 border-b border-accent-border mb-4">
        <h2 className="font-semibold  max-[375px]:text-[24px] text-center">
          {t.selectNumber.title}
        </h2>
      </div>

      <div
        className={`max-md:px-4 w-full grid ${
          selectedQuestions.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-2"
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
                {questionCounts[topic.name]} / {topic.questions.length || 0}
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
        {t.selectNumber.total}{" "}
        <span className="text-accent-extra">{totalQuestions}</span>
      </p>
      {language === "it" && (
        <p className="text-sm text-center px-4">
          <span className="text-amber-500 font-semibold">Nota:</span> le domande
          del quiz sono in Inglese; puoi farle tradurre dal browser, ma meglio
          leggerle in originale.
        </p>
      )}
      <div className="flex gap-4 mt-4 max-md:px-4">
        <button
          onClick={onCancel}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          {t.selectNumber.cancel}
        </button>
        <button
          onClick={onPrevious}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          {t.selectNumber.previous}
        </button>
        <Button
          onClick={handleNext}
          className="btn-primary !bg-accent-extra !text-white"
          disabled={totalQuestions < 1}
        >
          {t.selectNumber.startButton}
        </Button>
      </div>
    </>
  );
};

export default SelectNumberStep;

"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

/**
 * ChooseTopicStep Component
 *
 * This component allows users to select topics before starting the quiz.
 *
 * Props:
 * - topics: Array of available topics to choose from.
 * - onCancel: Function to cancel the selection and go back.
 * - onTopicsSelected: Function to pass selected topics to the parent component.
 */

const ChooseTopicStep = ({ topics, onCancel, onTopicsSelected }) => {
  // Initialize state with all topics pre-selected
  const [selectedTopics, setSelectedTopics] = useState(
    topics.reduce((acc, topic) => {
      acc[topic.key] = true;
      return acc;
    }, {})
  );

  /**
   * Toggles selection state for a topic
   */
  const handleCheckboxChange = (key) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific topic
    }));
  };

  /**
   * Handles form submission and passes selected topics
   */
  const handleSubmit = () => {
    const selectedKeys = Object.keys(selectedTopics).filter(
      (key) => selectedTopics[key]
    ); // Get selected keys
    console.log("Selected Keys in ChooseTopicStep:", selectedKeys); // Debugging
    onTopicsSelected(selectedKeys); // Pass keys to parent
  };

  return (
    <>
      {/* Header */}
      <div className="w-full center pb-3 md:pb-4 border-b border-accent-border mb-4">
        <h2 className="font-semibold  max-[375px]:text-[24px] text-center">
          Choose Your Topic
        </h2>
      </div>
      {/* Topic Selection Form */}
      <form className="max-md:px-4 w-full grid grid-cols-2 gap-2 sm:gap-4 mb-4">
        {topics.map((topic) => (
          <label
            key={topic.key}
            htmlFor={topic.key}
            className={`w-full flex flex-col gap-1 border border-accent-border p-2 rounded-md cursor-pointer ${
              selectedTopics[topic.key] ? "bg-bg-tertiary" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={topic.key}
                checked={selectedTopics[topic.key]}
                onCheckedChange={() => handleCheckboxChange(topic.key)}
              />
              <span className="text-lg font-medium">{topic.name}</span>
            </div>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </label>
        ))}
      </form>
      {/* Selection Status */}
      {Object.values(selectedTopics).filter(Boolean).length < 1 ? (
        <p className="text-center max-md:px-4 font-semibold text-red-500">
          Please select at least one topic.
        </p>
      ) : (
        <p className="text-center max-md:px-4 font-semibold">
          Selected Topics:{" "}
          <span className="text-accent-extra font-bold">
            {Object.values(selectedTopics).filter(Boolean).length}
          </span>
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4 max-md:px-4">
        <button
          onClick={onCancel}
          className="btn-secondary !px-[12px] !py-[6px]"
        >
          Cancel
        </button>
        <Button
          onClick={handleSubmit}
          className="btn-primary !bg-accent-extra !text-white"
          disabled={Object.values(selectedTopics).filter(Boolean).length < 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ChooseTopicStep;

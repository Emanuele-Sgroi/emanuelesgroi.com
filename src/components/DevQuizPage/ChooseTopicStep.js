"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ChooseTopicStep = ({ topics, onCancel, onTopicsSelected }) => {
  const [selectedTopics, setSelectedTopics] = useState(
    topics.reduce((acc, topic) => {
      acc[topic.key] = true; // Pre-select all topics
      return acc;
    }, {})
  );

  const handleCheckboxChange = (key) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific topic
    }));
  };

  const handleSubmit = () => {
    const selectedKeys = Object.keys(selectedTopics).filter(
      (key) => selectedTopics[key]
    ); // Get selected keys
    console.log("Selected Keys in ChooseTopicStep:", selectedKeys); // Debugging
    onTopicsSelected(selectedKeys); // Pass keys to parent
  };

  return (
    <>
      <div className="w-full center pb-4 border-b border-accent-border mb-4">
        <h2>Choose Your Topic</h2>
      </div>

      <form className="w-full grid grid-cols-2 gap-4 mb-4">
        {topics.map((topic) => (
          <label
            key={topic.key}
            htmlFor={topic.key}
            className={`w-[400px] flex flex-col gap-1 border border-accent-border p-2 rounded-md cursor-pointer ${
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

      {Object.values(selectedTopics).filter(Boolean).length < 1 ? (
        <p className="font-semibold text-red-500">
          Please select at least one topic.
        </p>
      ) : (
        <p className="font-semibold">
          Selected Topics:{" "}
          <span className="text-accent-extra font-bold">
            {Object.values(selectedTopics).filter(Boolean).length}
          </span>
        </p>
      )}

      <div className="flex gap-4 mt-4">
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

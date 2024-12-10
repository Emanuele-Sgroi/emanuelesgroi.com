"use client";
import React, { useState } from "react";
import WelcomeStep from "./WelcomeStep";
import ChooseTopicStep from "./ChooseTopicStep";
import SelectNumberStep from "./SelectNumberStep";
import QuizStep from "./QuizStep";
import {
  coreConceptsQuestions,
  reactQuestions,
  nextQuestions,
  javascriptQuestions,
  nodeJsQuestions,
  apiQuestions,
  reactNativeQuestions,
} from "@/utils/devQuizQuestions"; // import all topics created in /utils/devQuizQuestions.js

// Group all topics
const topics = [
  {
    name: "Core Concepts",
    description: "Includes OOP, Data Structures, Algorithms, and more",
    key: "CoreConcepts",
    questions: coreConceptsQuestions,
  },
  {
    name: "React",
    description: "Covers React Hooks, Virtual DOM, Lifecycle, and more",
    key: "React",
    questions: reactQuestions,
  },
  {
    name: "Next.js",
    description: "Topics include SSR, SSG, API Routes, and more",
    key: "NextJS",
    questions: nextQuestions,
  },
  {
    name: "JavaScript",
    description: "Covers the programming language in general",
    key: "JavaScript",
    questions: javascriptQuestions,
  },
  {
    name: "Node.js",
    description: "Explores Event Loop, Middleware, File System, and more",
    key: "NodeJS",
    questions: nodeJsQuestions,
  },
  {
    name: "React Native",
    description: "Mobile Development with React",
    key: "ReactNative",
    questions: reactNativeQuestions,
  },
  {
    name: "API",
    description: "Includes HTTP Methods, Status Codes, JWT, and more",
    key: "API",
    questions: apiQuestions,
  },
];

const DevQuizComponent = () => {
  const [quizStep, setQuizStep] = useState("welcome");
  const [selectedTopics, setSelectedTopics] = useState([]); // Tracks topics selected by the user
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Tracks final question counts

  const handleStartQuiz = () => setQuizStep("chooseTopic");
  const handleCancelQuiz = () => setQuizStep("welcome");
  const handleTopicsSelected = (selectedKeys) => {
    console.log("Selected Keys:", selectedKeys); // Debugging
    const topicsWithQuestions = topics.filter((topic) =>
      selectedKeys.includes(topic.key)
    );
    console.log("Topics With Questions:", topicsWithQuestions); // Debugging
    setSelectedTopics(topicsWithQuestions);
    setQuizStep("selectNumber");
  };
  const handleQuestionNumbersSelected = (questions) => {
    setSelectedQuestions(questions);
    setQuizStep("quizStart"); // Proceed to the quiz step
  };

  const handleQuizComplete = () => {
    console.log("quiz completed");
  };

  return (
    <div className="main-container">
      <div className="borded-container md:!min-h-[800px] !p-4">
        <div
          className={`w-full h-full md:!min-h-[800px] bg-bg-secondary rounded-md p-4 ${
            quizStep === "welcome"
              ? "center"
              : "flex items-center justify-start"
          } flex-col gap-4`}
        >
          {/* Welcome Step */}
          {quizStep === "welcome" && (
            <WelcomeStep onStartQuiz={handleStartQuiz} />
          )}
          {/* Choose Topics Step */}
          {quizStep === "chooseTopic" && (
            <ChooseTopicStep
              topics={topics}
              onCancel={handleCancelQuiz}
              onTopicsSelected={handleTopicsSelected}
            />
          )}
          {/* Select Number of Questions Step */}
          {quizStep === "selectNumber" && (
            <SelectNumberStep
              selectedQuestions={selectedTopics}
              onCancel={handleCancelQuiz}
              onNext={handleQuestionNumbersSelected}
              onPrevious={() => setQuizStep("chooseTopic")}
            />
          )}
          {/* Quiz Step */}

          {quizStep === "quizStart" && (
            <QuizStep
              questions={selectedQuestions.flatMap((topic) =>
                topic.questions.slice(0, topic.selectedCount)
              )}
              onCancel={() => setQuizStep("welcome")}
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevQuizComponent;

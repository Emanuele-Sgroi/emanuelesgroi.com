"use client";
import React, { useState } from "react";
import WelcomeStep from "./WelcomeStep";
import ChooseTopicStep from "./ChooseTopicStep";
import SelectNumberStep from "./SelectNumberStep";
import QuizStep from "./QuizStep";
import QuizResult from "./QuizResult";
import {
  coreConceptsQuestions,
  reactQuestions,
  nextQuestions,
  javascriptQuestions,
  nodeJsQuestions,
  apiQuestions,
  reactNativeQuestions,
  htmlQuestions,
  cssQuestions,
  typeScriptQuestions,
  blockchainQuestions,
  databaseQuestions,
  cloudQuestions,
} from "@/utils/devQuizQuestions"; // import all topics created in /utils/devQuizQuestions.js

// Group all topics
const topics = [
  {
    name: "Core Concepts",
    description:
      "Essential fundamentals including OOP, Data Structures, Algorithms, and problem-solving patterns.",
    key: "CoreConcepts",
    questions: coreConceptsQuestions,
  },
  {
    name: "JavaScript",
    description:
      "Deep dive into the language itself: syntax, types, closures, prototypes, and more.",
    key: "JavaScript",
    questions: javascriptQuestions,
  },
  {
    name: "TypeScript",
    description:
      "Covers static typing, interfaces, generics, compiler options, and advanced TS features.",
    key: "TypeScript",
    questions: typeScriptQuestions,
  },
  {
    name: "Node.js",
    description:
      "Focus on the runtime environment: event loop, FS module, middleware, async patterns, etc.",
    key: "NodeJS",
    questions: nodeJsQuestions,
  },
  {
    name: "Database",
    description:
      "SQL vs. NoSQL, indexing, normalization, transactions, and practical query examples.",
    key: "Database",
    questions: databaseQuestions,
  },
  {
    name: "Cloud",
    description:
      "Cloud services overview (AWS, Azure, GCP), deployments, IaC, serverless, scaling, and more.",
    key: "Cloud",
    questions: cloudQuestions,
  },
  {
    name: "HTML",
    description:
      "Semantic tags, forms, accessibility, responsive design, and HTML5 APIs.",
    key: "HTML",
    questions: htmlQuestions,
  },
  {
    name: "CSS",
    description:
      "Styling techniques, layouts (Flexbox/Grid), responsiveness, preprocessors, performance, etc.",
    key: "CSS",
    questions: cssQuestions,
  },
  {
    name: "React",
    description:
      "Covers React Hooks, Virtual DOM, lifecycle, state management, and ecosystem best practices.",
    key: "React",
    questions: reactQuestions,
  },
  {
    name: "Next.js",
    description:
      "Server-side rendering (SSR), static site generation (SSG), routing, API routes, and optimizations.",
    key: "NextJS",
    questions: nextQuestions,
  },
  {
    name: "React Native",
    description:
      "Mobile development with React. Components, styling, navigation, and platform APIs.",
    key: "ReactNative",
    questions: reactNativeQuestions,
  },
  {
    name: "API",
    description:
      "HTTP methods, REST principles, authentication (JWT), GraphQL, error handling, and best practices.",
    key: "API",
    questions: apiQuestions,
  },
  {
    name: "Blockchain",
    description:
      "Consensus mechanisms, smart contracts, dApp development, security, and real-world blockchain use cases.",
    key: "Blockchain",
    questions: blockchainQuestions,
  },
];

/**
 * DevQuizComponent
 *
 * This component manages the dev quiz flow.
 * It allows users to select topics, choose the number of questions,
 * take the quiz, and view their results.
 */

const DevQuizComponent = () => {
  const [quizStep, setQuizStep] = useState("welcome"); // Controls quiz steps
  const [selectedTopics, setSelectedTopics] = useState([]); // Tracks topics selected by the user
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Tracks final question counts
  const [quizResult, setQuizResult] = useState(null);

  // Shuffle questions to make them random
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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

  const handleQuizComplete = (results, elapsedTime, shuffledQuestions) => {
    // Calculate correct answers using shuffledQuestions and results
    const correctAnswers = shuffledQuestions.reduce(
      (count, question, index) => {
        const userAnswer = results[index]?.text;
        return userAnswer === question.answer ? count + 1 : count;
      },
      0
    );

    const totalQuestions = shuffledQuestions.length;

    setQuizResult({
      selectedTopics,
      correctAnswers,
      totalQuestions,
      elapsedTime,
    });

    setQuizStep("result");
  };

  return (
    <div className="main-container">
      <div className="borded-container md:!min-h-[800px] md:!p-4">
        <div
          className={`w-full h-full md:!min-h-[800px] md:bg-bg-secondary md:rounded-md md:p-4 ${
            quizStep === "welcome"
              ? "center"
              : quizStep === "result"
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
              questions={shuffleArray(
                selectedQuestions.flatMap((topic) =>
                  topic.questions.slice(0, topic.selectedCount)
                )
              )}
              onCancel={() => setQuizStep("welcome")}
              onComplete={handleQuizComplete}
              shuffleArray={shuffleArray}
            />
          )}
          {/* Result step */}
          {quizStep === "result" && quizResult && (
            <QuizResult
              selectedTopics={quizResult.selectedTopics}
              totalQuestions={quizResult.totalQuestions}
              correctAnswers={quizResult.correctAnswers}
              elapsedTime={quizResult.elapsedTime}
              onRestart={() => setQuizStep("chooseTopic")}
              onLeave={() => setQuizStep("welcome")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevQuizComponent;

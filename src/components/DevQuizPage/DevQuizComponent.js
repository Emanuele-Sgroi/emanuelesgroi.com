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
import { useLanguage } from "@/context/LanguageContext";
import devQuizTranslations from "@/translations/devQuiz";

/**
 * DevQuizComponent
 *
 * This component manages the dev quiz flow.
 * It allows users to select topics, choose the number of questions,
 * take the quiz, and view their results.
 */

const DevQuizComponent = () => {
  // translation
  const { language } = useLanguage();
  const t = devQuizTranslations[language];

  const [quizStep, setQuizStep] = useState("welcome"); // Controls quiz steps
  const [selectedTopics, setSelectedTopics] = useState([]); // Tracks topics selected by the user
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Tracks final question counts
  const [quizResult, setQuizResult] = useState(null);

  // Group all topics
  const topics = [
    {
      name: t.chooseTopic.topics.coreConcepts.name,
      description: t.chooseTopic.topics.coreConcepts.description,
      key: "CoreConcepts",
      questions: coreConceptsQuestions,
    },
    {
      name: t.chooseTopic.topics.javascript.name,
      description: t.chooseTopic.topics.javascript.description,
      key: "JavaScript",
      questions: javascriptQuestions,
    },
    {
      name: t.chooseTopic.topics.typescript.name,
      description: t.chooseTopic.topics.typescript.description,
      key: "TypeScript",
      questions: typeScriptQuestions,
    },
    {
      name: t.chooseTopic.topics.node.name,
      description: t.chooseTopic.topics.node.description,
      key: "NodeJS",
      questions: nodeJsQuestions,
    },
    {
      name: t.chooseTopic.topics.database.name,
      description: t.chooseTopic.topics.database.description,
      key: "Database",
      questions: databaseQuestions,
    },
    {
      name: t.chooseTopic.topics.cloud.name,
      description: t.chooseTopic.topics.cloud.description,
      key: "Cloud",
      questions: cloudQuestions,
    },
    {
      name: t.chooseTopic.topics.html.name,
      description: t.chooseTopic.topics.html.description,
      key: "HTML",
      questions: htmlQuestions,
    },
    {
      name: t.chooseTopic.topics.css.name,
      description: t.chooseTopic.topics.css.description,
      key: "CSS",
      questions: cssQuestions,
    },
    {
      name: t.chooseTopic.topics.react.name,
      description: t.chooseTopic.topics.react.description,
      key: "React",
      questions: reactQuestions,
    },
    {
      name: t.chooseTopic.topics.next.name,
      description: t.chooseTopic.topics.next.description,
      key: "NextJS",
      questions: nextQuestions,
    },
    {
      name: t.chooseTopic.topics.reactnative.name,
      description: t.chooseTopic.topics.reactnative.description,
      key: "ReactNative",
      questions: reactNativeQuestions,
    },
    {
      name: t.chooseTopic.topics.api.name,
      description: t.chooseTopic.topics.api.description,
      key: "API",
      questions: apiQuestions,
    },
    {
      name: t.chooseTopic.topics.blockchain.name,
      description: t.chooseTopic.topics.blockchain.description,
      key: "Blockchain",
      questions: blockchainQuestions,
    },
  ];

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
            <WelcomeStep
              onStartQuiz={handleStartQuiz}
              t={t}
              language={language}
            />
          )}
          {/* Choose Topics Step */}
          {quizStep === "chooseTopic" && (
            <ChooseTopicStep
              topics={topics}
              onCancel={handleCancelQuiz}
              onTopicsSelected={handleTopicsSelected}
              t={t}
              language={language}
            />
          )}
          {/* Select Number of Questions Step */}
          {quizStep === "selectNumber" && (
            <SelectNumberStep
              selectedQuestions={selectedTopics}
              onCancel={handleCancelQuiz}
              onNext={handleQuestionNumbersSelected}
              onPrevious={() => setQuizStep("chooseTopic")}
              t={t}
              language={language}
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
              t={t}
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
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevQuizComponent;

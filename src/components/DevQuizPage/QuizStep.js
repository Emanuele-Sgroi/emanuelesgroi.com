"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ThemeContext from "@/context/ThemeProvider";

/**
 * QuizStep Component
 *
 * This component handles the quiz logic, including:
 * - Displaying questions with multiple-choice answers.
 * - Keeping track of elapsed time.
 * - Preventing accidental navigation.
 * - Handling user answers and providing explanations.
 * - Managing navigation between questions.
 *
 * Props:
 * - questions: Array of questions to be displayed.
 * - onCancel: Function to cancel the quiz.
 * - onComplete: Function to complete the quiz and show results.
 * - shuffleArray: Function to shuffle question options.
 */

const QuizStep = ({ questions, onCancel, onComplete, shuffleArray, t }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);
  const router = useRouter();
  const originalPushRef = useRef(router.push);

  // Use an effect to increment elapsedTime:
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle browser/tab navigation (external)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Required for most modern browsers to show a warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // handle navigation (internal)
  useEffect(() => {
    if (typeof window === "undefined") return;

    router.push = (url, as, options) => {
      if (url !== router.asPath) {
        setPendingUrl(() => () => originalPushRef.current(url, as, options));
        setShowNavigationWarning(true);
        return;
      }
      return originalPushRef.current(url, as, options);
    };
    return () => {
      router.push = originalPushRef.current;
    };
  }, [router]);

  useEffect(() => {
    const shuffled = questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  // Replace currentQuestion usage with shuffledQuestions:
  const currentQuestion = shuffledQuestions[currentIndex];

  // Define option labels
  const optionLabels = ["A.", "B.", "C.", "D.", "E.", "F."];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      onComplete(selectedAnswers, elapsedTime, shuffledQuestions);
    }
  };

  const handleNavigationConfirm = () => {
    if (pendingUrl) pendingUrl();
    restoreOriginalPush();
  };

  const handleNavigationCancel = () => {
    setShowNavigationWarning(false);
    setPendingUrl(null);
    restoreOriginalPush();
  };

  const restoreOriginalPush = () => {
    router.push = originalPushRef.current;
  };

  return (
    <>
      <QuizHeader
        elapsedTime={elapsedTime}
        currentIndex={currentIndex}
        questions={questions}
        t={t}
      />

      <div className="max-md:px-4 w-full flex items-start flex-col gap-6">
        <div className="w-full -mt-4 flex flex-col justify-start items-start gap-2">
          <p className="text-xs text-text-secondary">
            {t.quiz.topic} <span>{currentQuestion?.topic}</span>
          </p>
          <h3 className="text-lg font-semibold">{currentQuestion?.question}</h3>
          <div className="w-full">
            {currentQuestion?.code && currentQuestion?.language && (
              <CodeBlock
                code={currentQuestion?.code}
                lang={currentQuestion?.language || "javascript"}
              />
            )}
          </div>
        </div>

        <div className="w-full flex items-start flex-col gap-4">
          {currentQuestion?.options.map((option, index) => {
            const isSelected =
              selectedAnswers[currentIndex]?.text === option?.text;
            const isCorrect = option?.text === currentQuestion?.answer;
            const isIncorrect = isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-fit max-w-full h-auto p-2 rounded-md text-left !text-text-primary border hover:!bg-bg-hover flex flex-col justify-start items-start ${
                  showExplanation
                    ? isCorrect
                      ? "border-green-500"
                      : isIncorrect
                      ? "border-red-500"
                      : "border-accent-border"
                    : "border-accent-border"
                } !bg-transparent`}
                disabled={showExplanation} // Disable after selecting an answer
              >
                <span className="flex">
                  <span className="mr-[5px] font-normal text-text-secondary">
                    {optionLabels[index]}
                  </span>{" "}
                  {option.text}
                </span>
                {option.code && (
                  <CodeBlock
                    code={option?.code}
                    lang={
                      currentQuestion?.language
                        ? currentQuestion.language
                        : "javascript"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <div className="w-full bg-bg-hover dark:bg-bg-button p-2 rounded-md">
            <p
              className={`font-semibold ${
                selectedAnswers[currentIndex].text === currentQuestion?.answer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedAnswers[currentIndex].text === currentQuestion?.answer
                ? t.quiz.correct
                : t.quiz.incorrect}
            </p>
            <p className=" text-text-primary text-left">
              {currentQuestion?.explanation?.text}
            </p>
            {currentQuestion?.explanation?.code && (
              <CodeBlock
                code={currentQuestion?.explanation?.code}
                lang={
                  currentQuestion?.language
                    ? currentQuestion.language
                    : "javascript"
                }
              />
            )}
          </div>
        )}
      </div>

      {/* Navigation Warning */}
      <NavigationWarning
        showNavigationWarning={showNavigationWarning}
        handleNavigationCancel={handleNavigationCancel}
        handleNavigationConfirm={handleNavigationConfirm}
        t={t}
      />

      <QuizFooter
        onCancel={onCancel}
        handleNext={handleNext}
        selectedAnswers={selectedAnswers}
        currentIndex={currentIndex}
        questions={questions}
        t={t}
      />
    </>
  );
};

export default QuizStep;

const QuizHeader = ({ currentIndex, questions, elapsedTime, t }) => {
  return (
    <div className="max-md:px-4 w-full flex justify-between pb-4 border-b border-accent-border mb-4">
      <p className="text-text-primary text-lg">
        {t.quiz.question} <span className="font-bold">{currentIndex + 1}</span>{" "}
        {t.quiz.of} <span className="font-bold">{questions.length}</span>
      </p>
      <p className="text-sm text-text-secondary">
        {String(Math.floor(elapsedTime / 3600)).padStart(2, "0")}:
        {String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0")}:
        {String(elapsedTime % 60).padStart(2, "0")}
      </p>
    </div>
  );
};

const QuizFooter = ({
  onCancel,
  handleNext,
  selectedAnswers,
  currentIndex,
  questions,
  t,
}) => (
  <div className="max-md:px-4 w-full center gap-6 mt-6">
    {/* Quit Button with Alert Dialog */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="btn-secondary !bg-transparent !text-text-primary hover:!bg-bg-hover !px-4 !py-[7px]">
          {t.quiz.quit}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.quiz.quitQuiz}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.quiz.areYouSureToQuit}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t.quiz.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onCancel}>
            {t.quiz.quit}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Button
      onClick={handleNext}
      className="btn-primary !bg-accent-extra !text-white"
      disabled={!selectedAnswers[currentIndex]}
    >
      {currentIndex === questions.length - 1 ? t.quiz.finish : t.quiz.next}
    </Button>
  </div>
);

const NavigationWarning = ({
  showNavigationWarning,
  handleNavigationCancel,
  handleNavigationConfirm,
  t,
}) => (
  <AlertDialog open={showNavigationWarning}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{t.quiz.leaveQuiz}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.quiz.areYouSureToLeave}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleNavigationCancel}>
          {t.quiz.cancel}
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleNavigationConfirm}>
          {t.quiz.leave}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const CodeBlock = ({ code, lang }) => {
  const { theme } = useContext(ThemeContext);
  if (typeof code === "string") {
    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLongLines={true}
        language={lang}
        style={theme === "dark" ? darcula : oneLight}
        className="w-full rounded-md border border-accent-border"
      >
        {code}
      </SyntaxHighlighter>
    );
  }
};

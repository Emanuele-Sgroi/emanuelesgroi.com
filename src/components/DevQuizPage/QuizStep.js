"use client";

import { useEffect, useState } from "react";
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

const QuizStep = ({ questions, onCancel, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      onComplete(selectedAnswers); // Pass results to parent
    }
  };

  //   const handlePrevious = () => {
  //     if (currentIndex > 0) {
  //       setCurrentIndex((prev) => prev - 1);
  //       setShowExplanation(false);
  //     }
  //   };

  return (
    <>
      <QuizHeader currentIndex={currentIndex} questions={questions} />

      <div className="w-full flex items-start flex-col gap-6">
        <div className="w-full">
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
        </div>

        <div className="w-full flex items-start flex-col gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentIndex] === option;
            const isCorrect = option === currentQuestion.answer;
            const isIncorrect = isSelected && !isCorrect;

            return (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-2 rounded-md text-left !text-text-primary border hover:!bg-bg-hover ${
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
                {option}
              </Button>
            );
          })}
        </div>
        {showExplanation && (
          <div className="w-full bg-bg-hover dark:bg-bg-button p-2 rounded-md">
            <p
              className={`font-semibold ${
                selectedAnswers[currentIndex] === currentQuestion.answer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedAnswers[currentIndex] === currentQuestion.answer
                ? "Correct! "
                : "Incorrect. "}
            </p>
            <p className=" text-text-primary text-left">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      <QuizFooter
        onCancel={onCancel}
        handleNext={handleNext}
        selectedAnswers={selectedAnswers}
        currentIndex={currentIndex}
        questions={questions}
      />
    </>
  );
};

export default QuizStep;

const QuizHeader = ({ currentIndex, questions }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full flex justify-between pb-4 border-b border-accent-border mb-4">
      <p className="text-text-primary text-lg">
        Question <span className="font-bold">{currentIndex + 1}</span> of{" "}
        <span className="font-bold">{questions.length}</span>
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
}) => (
  <div className="w-full center gap-6 mt-6">
    {/* Quit Button with Alert Dialog */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="btn-secondary !bg-transparent !text-text-primary hover:!bg-bg-hover !px-4 !py-[7px]">
          Quit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quit Quiz</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to quit the quiz? Your progress will not be
            saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onCancel}>Quit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Button
      onClick={handleNext}
      className="btn-primary !bg-accent-extra !text-white"
      disabled={!selectedAnswers[currentIndex]}
    >
      {currentIndex === questions.length - 1 ? "Finish" : "Next"}
    </Button>
  </div>
);

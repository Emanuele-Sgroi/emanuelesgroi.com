import React from "react";

const DevQuizComponent = () => {
  const handleStartQuiz = () => {
    // Placeholder for navigation or logic to start the quiz
    console.log("Quiz started!");
  };

  return (
    <div className="main-container">
      <div className="borded-container md:!min-h-[800px] !p-4">
        <div className="w-full h-full md:!min-h-[800px] bg-bg-tertiary rounded-md p-4 center flex-col gap-4">
          <div className="w-full center pb-4 border-b border-accent-border mb-4">
            <h2>Welcome to Dev Quiz</h2>
          </div>

          <p className="text-center text-text-secondary text-lg">
            As developers, we have to remember a lot. Like any skill, memory
            needs practice. I&apos;ve always loved using quizzes and flashcards
            to train my brain to remember hard concepts, so I decided to create
            my own.
          </p>
          <p className="text-center text-text-secondary text-lg">
            No difficulty levels here! Questions are random and come in all
            levels of challenge.
          </p>
          <p className="text-center text-text-primary text-sm mb-4">
            Pick a topics <span className="text-accent-extra">&gt;</span> Set
            the number of questions{" "}
            <span className="text-accent-extra">&gt;</span> START
          </p>

          {/* Start Quiz Button */}
          <button onClick={handleStartQuiz} className="btn-primary">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevQuizComponent;

import React from "react";

const WelcomeStep = ({ onStartQuiz }) => (
  <>
    <div className="w-full center pb-4 border-b border-accent-border mb-4">
      <h2>Welcome to Dev Quiz</h2>
    </div>
    <p className="text-center text-text-secondary text-lg">
      As developers, we have to remember a lot. Like any skill, memory needs
      practice. I&apos;ve always loved using quizzes and flashcards to train my
      brain to remember hard concepts, so I decided to create my own.
    </p>
    <p className="text-center text-text-secondary text-lg">
      No difficulty levels here! Questions are random and come in all levels of
      challenge.
    </p>
    <p className="text-center text-text-primary text-sm mb-4">
      Pick a topic <span className="text-accent-extra">&gt;</span> Set the
      number of questions <span className="text-accent-extra">&gt;</span> START
    </p>
    <button onClick={onStartQuiz} className="btn-primary">
      Start Quiz
    </button>
  </>
);

export default WelcomeStep;

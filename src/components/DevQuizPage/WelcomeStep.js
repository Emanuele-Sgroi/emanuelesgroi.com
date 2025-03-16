import React from "react";

/**
 * WelcomeStep Component
 *
 * Displays the welcome screen for the Dev Quiz.
 * - Provides an introduction to the quiz.
 * - Explains the purpose of using quizzes for memory training.
 * - Guides users on how to proceed.
 * - Contains a button to start the quiz.
 *
 * Props:
 * - onStartQuiz: Function to initiate the quiz.
 */

const WelcomeStep = ({ onStartQuiz }) => (
  <>
    <div className="w-full center pb-3 md:pb-4 border-b border-accent-border mb-4">
      <h1 className="font-semibold  max-[375px]:text-[24px] text-center">
        Welcome to Dev Quiz
      </h1>
    </div>
    <p className="max-md:px-4 text-center text-text-secondary text-lg">
      As developers, we have to remember a lot. Like any skill, memory needs
      practice. I&apos;ve always loved using quizzes and flashcards to train my
      brain to remember hard concepts, so I decided to create my own.
    </p>
    <p className="max-md:px-4 text-center text-text-secondary text-lg">
      No difficulty levels here! Questions are random and come in all levels of
      challenge.
    </p>
    <p className="max-md:px-4 text-center text-text-primary text-xs sm:text-sm mb-4">
      Pick a topic <span className="text-accent-extra">&gt;</span> Set the
      number of questions <span className="text-accent-extra">&gt;</span> START
    </p>
    <button onClick={onStartQuiz} className="btn-primary">
      Start Quiz
    </button>
  </>
);

export default WelcomeStep;

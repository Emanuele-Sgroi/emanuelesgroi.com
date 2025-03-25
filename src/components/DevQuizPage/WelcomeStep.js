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
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      As developers, there&apos;s always a ton to keep in mind. Like any skill,
      memory needs regular practice. I&apos;ve always enjoyed using quizzes and
      flashcards to sharpen my brain for those tricky concepts, so I went ahead
      and built my own.
    </p>
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      No difficulty levels here! questions are pulled at random, mixing
      everything from beginner to advanced.
    </p>
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      Have Fun 💪
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

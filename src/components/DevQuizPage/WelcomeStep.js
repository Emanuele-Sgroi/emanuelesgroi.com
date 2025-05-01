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

const WelcomeStep = ({ onStartQuiz, t, language }) => (
  <>
    <div className="w-full center pb-3 md:pb-4 border-b border-accent-border mb-4">
      <h1 className="font-semibold  max-[375px]:text-[24px] text-center">
        {t.welcome.title}
      </h1>
    </div>
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      {t.welcome.friendlySentence}
    </p>
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      {t.welcome.noDifficultySentence}
    </p>
    <p className="max-md:px-4 text-center text-text-secondary text-base md:text-lg">
      {t.welcome.haveFun} 💪
    </p>
    <p className="max-md:px-4 text-center text-text-primary text-xs sm:text-sm mb-4">
      {t.welcome.pickTopic} <span className="text-accent-extra">&gt;</span>{" "}
      {t.welcome.setNumber} <span className="text-accent-extra">&gt;</span>{" "}
      {t.welcome.start}
    </p>
    {language === "it" && (
      <p className="mb-6 text-sm text-center px-4">
        <span className="text-amber-500 font-semibold">Nota:</span> le domande
        del quiz sono in Inglese; puoi farle tradurre dal browser, ma meglio
        leggerle in originale.
      </p>
    )}
    <button onClick={onStartQuiz} className="btn-primary">
      {t.welcome.startButton}
    </button>
  </>
);

export default WelcomeStep;

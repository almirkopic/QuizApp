import React from "react";
import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import reactImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <h2>QUIZ COMPLETED!</h2>
        <img src={reactImg} />
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
      <h2> {QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li className="answer" key={answer}>
            <button onClick={() => handleSelectAnswer()}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;

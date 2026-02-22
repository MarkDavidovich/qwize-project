import { PlayerStatsContext } from "./player-stats-context";
import { useState, useRef } from "react";
import { ONE_SECOND } from "../lib/constants";

const PlayerStatsProvider = ({ children }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  const timerRef = useRef(null);

  const handleTimer = (isCounting) => {
    if (isCounting) {
      if (timerRef.current) return;

      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, ONE_SECOND);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleCorrectAnswer = () => {
    const pointsMap = { easy: 1, medium: 2, hard: 3 };
    const points = pointsMap[questionDifficulty.toLowerCase()] || 0;

    const newCorrectAnswers = correctAnswers + 1;
    const newTotalScore = totalScore + points;

    setCorrectAnswers(newCorrectAnswers);
    setTotalScore(newTotalScore);

    return {
      newCorrectAnswers,
      newTotalScore,
    };
  };

  const handleTotalQuestions = (questionsAmount) => {
    setTotalQuestions(questionsAmount);
  };

  const handleQuestionDifficulty = (difficulty) => {
    setQuestionDifficulty(difficulty);
  };

  const handleCompleteQuiz = (isCompleted) => {
    handleTimer(false);
    setCompletedQuiz(isCompleted);
  };

  const handleResetStats = () => {
    handleCompleteQuiz(false);
    setTimeElapsed(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setQuestionDifficulty("");
    setTotalScore(0);
  };

  const ctxValue = {
    timeElapsed,
    correctAnswers,
    totalQuestions,
    questionDifficulty,
    totalScore,
    completedQuiz,
    handleTimer,
    handleCorrectAnswer,
    handleTotalQuestions,
    handleQuestionDifficulty,
    handleCompleteQuiz,
    handleResetStats,
  };

  return <PlayerStatsContext value={ctxValue}>{children}</PlayerStatsContext>;
};

export default PlayerStatsProvider;

import { PlayerStatsContext } from "./player-stats-context";
import { useState, useRef } from "react";

const PlayerStatsProvider = ({ children }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [chosenDifficulty, setChosenDifficulty] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  const timerRef = useRef(null);

  const handleTimer = (isCounting) => {
    if (isCounting) {
      if (timerRef.current) return;

      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleCorrectAnswer = () => {
    const pointsMap = { easy: 1, medium: 2, hard: 3 };
    const points = pointsMap[chosenDifficulty.toLowerCase()] || 0;

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

  const handleChosenDifficulty = (difficulty) => {
    setChosenDifficulty(difficulty);
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
    setChosenDifficulty("");
    setTotalScore(0);
  };

  const ctxValue = {
    timeElapsed,
    correctAnswers,
    totalQuestions,
    chosenDifficulty,
    totalScore,
    completedQuiz,
    handleTimer,
    handleCorrectAnswer,
    handleTotalQuestions,
    handleChosenDifficulty,
    handleCompleteQuiz,
    handleResetStats,
  };

  return <PlayerStatsContext value={ctxValue}>{children}</PlayerStatsContext>;
};

export default PlayerStatsProvider;

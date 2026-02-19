import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { triviaData } from "../../lib/DummyData.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import { Container, Title, Text, Progress, Flex } from "@mantine/core";
import { TIME_PER_QUESTION, ONE_SECOND } from "../../lib/constants.js";
import { calculatePercentage } from "../../lib/helperFunctions.js";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currTime, setCurrTime] = useState(TIME_PER_QUESTION);
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    console.log("NEXT QUESTION ACTIVATED");
    if (currentIndex < triviaData.length - 1) {
      setCurrentIndex((next) => next + 1);
    } else {
      navigate("/leaderboards");
    }
  };

  useEffect(() => {
    setCurrTime(TIME_PER_QUESTION);

    const intervalId = setInterval(() => {
      setCurrTime((prev) => {
        if (prev <= ONE_SECOND) {
          clearInterval(intervalId);
          handleNextQuestion();
        }

        return prev - ONE_SECOND;
      });
    }, ONE_SECOND);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const currTimePercentage = calculatePercentage(currTime, TIME_PER_QUESTION);
  const currQuestionPercentage = calculatePercentage(currentIndex, triviaData.length - 1);

  return (
    <Container size="sm" py="xl">
      <Text ta="center" c="dimmed" mb="sm">
        Question {currentIndex + 1} of {triviaData.length}
      </Text>
      <Progress mb={"lg"} value={currQuestionPercentage} transitionDuration={500}></Progress>
      <QuestionCard
        key={triviaData[currentIndex].id}
        currentQuestion={triviaData[currentIndex]}
        onNext={handleNextQuestion}
        currTime={currTime}
        currTimePercentage={currTimePercentage}
      />
    </Container>
  );
};

export default Quiz;

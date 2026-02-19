import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../lib/APIQuestions.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import { Container, Title, Text, Progress, Flex, Loader, Center } from "@mantine/core";
import { TIME_PER_QUESTION, ONE_SECOND } from "../../lib/constants.js";
import { calculatePercentage } from "../../lib/helperFunctions.js";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currTime, setCurrTime] = useState(TIME_PER_QUESTION);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((next) => next + 1);
    } else {
      navigate("/leaderboards");
    }
  };

  useEffect(() => {
    if (loading || questions.length === 0) return;
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
  }, [currentIndex, loading, questions]);

  if (loading) {
    return (
      <Center h="50vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (questions.length === 0) {
    return (
      <Container size="sm" py="xl">
        <Text ta="center">No questions found. Please check your database.</Text>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currTimePercentage = calculatePercentage(currTime, TIME_PER_QUESTION);
  const currQuestionPercentage = calculatePercentage(currentIndex, questions.length - 1);

  return (
    <Container size="sm" py="xl">
      <Text ta="center" c="dimmed" mb="sm">
        Question {currentIndex + 1} of {questions.length}
      </Text>
      <Progress mb={"lg"} value={currQuestionPercentage} transitionDuration={500}></Progress>
      <QuestionCard
        key={currentQuestion.id}
        currentQuestion={currentQuestion}
        onNext={handleNextQuestion}
        currTime={currTime}
        currTimePercentage={currTimePercentage}
      />
    </Container>
  );
};

export default Quiz;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../lib/questions";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import { Container, Title, Text, Progress, Flex, Loader, Center } from "@mantine/core";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5000);
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

    const timeOutId = setTimeout(() => {
      handleNextQuestion();
    }, timeLeft);

    return () => {
      clearTimeout(timeOutId);
      setTimeLeft(5000);
    };
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

  return (
    <Container size="sm" py="xl">
      <Text ta="center" c="dimmed" mb="sm">
        Question {currentIndex + 1} of {questions.length}
      </Text>
      <Progress mb={"lg"} value={30}></Progress>
      <QuestionCard key={currentQuestion.id} currentQuestion={currentQuestion} onNext={handleNextQuestion} />
    </Container>
  );
};

export default Quiz;

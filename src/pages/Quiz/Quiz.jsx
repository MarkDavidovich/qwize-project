import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions } from "../../lib/APIQuestions.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import { Container, Text, Progress, Flex, Loader, Center, Modal, Button, Group } from "@mantine/core";
import { TIME_PER_QUESTION, ONE_SECOND } from "../../lib/constants.js";
import { calculatePercentage } from "../../lib/helperFunctions.js";
import { usePlayerStats } from "../../store/player-stats-context.js";
import { useAuth } from "../../auth/AuthProvider";
import { updateLeaderboard } from "../../lib/APILeaderboards.js";
import { updateUserInfo } from "../../lib/APIUserInfo.js";
import style from "./Quiz.module.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currTime, setCurrTime] = useState(TIME_PER_QUESTION);
  const [loading, setLoading] = useState(true);
  const [isAnswering, setAnswering] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const navigate = useNavigate();

  const { difficulty, amount } = useParams();
  const { timeElapsed, handleTimer, handleResetStats, handleTotalQuestions, handleQuestionDifficulty, handleCompleteQuiz, handleCorrectAnswer } =
    usePlayerStats();
  const { loggedOnUser } = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getQuestions(difficulty, amount);
        handleResetStats();
        setQuestions(data);
        handleTimer(true);
        handleTotalQuestions(amount);
        handleQuestionDifficulty(data[0].difficulty);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [difficulty, amount]);

  const handleNextQuestion = async () => {
    setAnswering(false);
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setCurrTime(TIME_PER_QUESTION);
      handleQuestionDifficulty(questions[nextIdx].difficulty);
    } else {
      const isEasyFive = String(difficulty).toLowerCase() === "easy" && Number(amount) === 5;
      // debug info

      if (!loggedOnUser && isEasyFive) {
        setShowRegisterModal(true);
      } else {
        const { newCorrectAnswers, newTotalScore } = handleCorrectAnswer();
        handleCompleteQuiz(true);
        await updateLeaderboard(loggedOnUser.email, newTotalScore, newCorrectAnswers, timeElapsed);
        await updateUserInfo(loggedOnUser.id, {
          totalScore: newTotalScore,
          totalTime: timeElapsed,
          correctAnswers: newCorrectAnswers,
        });
        navigate("/leaderboards");
      }
    }
  };

  useEffect(() => {
    if (loading || questions.length === 0 || isAnswering || showQuitModal || showRegisterModal) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrTime((prev) => prev - ONE_SECOND);
    }, ONE_SECOND);

    return () => clearInterval(intervalId);
  }, [currentIndex, loading, isAnswering, showQuitModal, showRegisterModal]);

  useEffect(() => {
    if (currTime <= 0) {
      handleNextQuestion();
    }
  }, [currTime]);

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
      <div className={`${style.container}${showQuitModal ? style.blurred : ""}`}>
        <Flex justify="center" align="center" gap="xs" mb="sm">
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            px="xs"
            py={2}
            c="white"
            bg={currentQuestion.difficulty === "easy" ? "green" : currentQuestion.difficulty === "medium" ? "orange" : "red"}
            style={{ borderRadius: "100px" }}
          >
            {currentQuestion.difficulty}
          </Text>
          <Text c="dimmed" size="sm">
            Question {currentIndex + 1} of {questions.length}
          </Text>
        </Flex>

        <Progress mb={"lg"} value={currQuestionPercentage} transitionDuration={500}></Progress>
        <div className={`${style.container}${showQuitModal ? style.blurred : ""}`}></div>
        <QuestionCard
          key={currentQuestion.id}
          currentQuestion={currentQuestion}
          onNext={handleNextQuestion}
          currTime={currTime}
          currTimePercentage={currTimePercentage}
          handleAnswering={() => {
            setAnswering(true);
          }}
        />
      </div>

      <Button
        variant="outline"
        color="red"
        size="md"
        mt="md"
        w="100%"
        onClick={() => {
          setShowQuitModal(true);
          handleTimer(false);
        }}
      >
        Quit
      </Button>

      <Modal
        opened={showQuitModal}
        onClose={() => {
          setShowQuitModal(false);
          handleTimer(true);
        }}
        title="Leaving so soon?"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 5,
        }}
      >
        <Text size="sm" mb="lg">
          Are you sure you want to finish the quiz now? Your current progress will not be saved to the leaderboards.
        </Text>

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setShowQuitModal(false)}>
            Stay and Finish
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleCompleteQuiz(false);
              navigate("/");
            }}
          >
            Yes, Quit Quiz
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          navigate("/register");
        }}
        title="Great job!"
        centered
      >
        <Text mb="sm">To fully experience Qwize and have your scores saved, please register for an account.</Text>
        <Flex justify="flex-end">
          <Button onClick={() => navigate("/register")} mr="sm">
            Register Now
          </Button>
        </Flex>
      </Modal>
    </Container>
  );
};

export default Quiz;

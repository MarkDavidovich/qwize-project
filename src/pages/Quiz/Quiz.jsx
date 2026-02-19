import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triviaData } from "../../lib/DummyData.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import { Container, Title, Text } from "@mantine/core";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (currentIndex < triviaData.length - 1) {
      setCurrentIndex((next) => next + 1);
    } else {
      navigate("/leaderboards");
    }
  };

  return (
    <Container size="sm" py="xl">
      <Text ta="center" c="dimmed" mb="sm">
        Question {currentIndex + 1} of {triviaData.length}
      </Text>
      
      <QuestionCard 
        key={triviaData[currentIndex].id}
        currentQuestion={triviaData[currentIndex]} 
        onNext={handleNextQuestion} 
      />
    </Container>
  );
};

export default Quiz;
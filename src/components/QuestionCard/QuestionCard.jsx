import style from "./QuestionCard.module.css";
import { useState } from "react";
import { Flex, Paper, Title, Group, Button, Text } from "@mantine/core";
import AnswerList from "../AnswerList/AnswerList.jsx";


const QuestionCard = ({ currentQuestion, onNext }) => {
  const [selectedText, setSelectedText] = useState(null);


  // תשובה שראיתי באינטרנט לערבוב תשובות
  const answers = useState(() => {
    return [
      ...currentQuestion.incorrect_answers.map((text) => ({
        text,
        isCorrect: false,
      })),
      { text: currentQuestion.correct_answer, isCorrect: true },
    ].sort(() => Math.random() - 0.5);
  })[0];

  function handleSelectAnswer(answer) {
    if (selectedText !== null) return;
    setSelectedText(answer.text);

    setTimeout(() => {
      onNext();
    }, 1000);
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Paper shadow="sm" p="xl" withBorder radius="md" w={520}>
        <Title order={3} mb="md">
          {currentQuestion.question}
        </Title>

        <AnswerList
          answers={answers}
          selectedText={selectedText}
          onSelectAnswer={handleSelectAnswer}
        />
      </Paper>
    </Flex>
  );
};

export default QuestionCard;

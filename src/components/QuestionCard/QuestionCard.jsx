import style from "./QuestionCard.module.css";
import { useState } from "react";
import { Flex, Paper, Title, Group, Button, Text } from "@mantine/core";
import { triviaData } from "../../lib/DummyData.js";
import AnswerList from "../AnswerList/AnswerList.jsx";


const QuestionCard = () => {
  const [selectedText, setSelectedText] = useState(null);

  const currentQuestion = triviaData[0];

  const answers = [
    ...currentQuestion.incorrect_answers.map((text) => ({
      text,
      isCorrect: false,
    })),
    { text: currentQuestion.correct_answer, isCorrect: true },
  ];

  function handleSelectAnswer(answerObj) {
    if (selectedText !== null) return; // prevent changing after first click
    setSelectedText(answerObj.text);
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

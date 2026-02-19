import style from "./QuestionCard.module.css";
import { useState } from "react";
import { Flex, Paper, Title, Group, Button, Text, SemiCircleProgress } from "@mantine/core";
import AnswerList from "../AnswerList/AnswerList.jsx";

const QuestionCard = ({ currentQuestion, onNext, currTime, currTimePercentage }) => {
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
      <Paper shadow="sm" p="xl" withBorder radius="md" w={"100%"}>
        <Title order={3} mb="md">
          {currentQuestion.question}
        </Title>

        <AnswerList answers={answers} selectedText={selectedText} onSelectAnswer={handleSelectAnswer} />
        <Flex justify="center" mt="sm">
          <SemiCircleProgress
            transitionDuration={1000}
            fillDirection="left-to-right"
            orientation="up"
            filledSegmentColor="blue"
            size={150}
            thickness={12}
            value={currTimePercentage}
            label={currTime / 1000}
            fw={500}
          />
        </Flex>
      </Paper>
    </Flex>
  );
};

export default QuestionCard;

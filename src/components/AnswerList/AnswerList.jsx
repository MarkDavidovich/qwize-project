import style from "./AnswerList.module.css";
import { Group, SimpleGrid } from "@mantine/core";
import Answer from "../Answer/Answer.jsx";

const AnswerList = ({ answers, selectedText, onSelectAnswer }) => {
  const hasAnswered = selectedText !== null;

  return (
    <SimpleGrid cols={2} spacing="md">
      {answers.map((ans) => (
        <Answer
          key={ans.text}
          text={ans.text}
          isCorrect={ans.isCorrect}
          selected={selectedText === ans.text}
          hasAnswered={hasAnswered}
          onSelect={() => onSelectAnswer(ans)}
        />
      ))}
    </SimpleGrid>
  );
};

export default AnswerList;

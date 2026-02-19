
import style from "./AnswerList.module.css";
import { Group } from "@mantine/core";
import Answer from "../Answer/Answer.jsx";

const AnswerList = ({ answers, selectedText, onSelectAnswer }) => {
  const hasAnswered = selectedText !== null;

  return (
    <Group grow wrap="wrap" gap="md">
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
    </Group>
  );
};

export default AnswerList;

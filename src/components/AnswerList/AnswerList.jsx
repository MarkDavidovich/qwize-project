import style from "./AnswerList.module.css";
import Answer from "./Answer/Answer.jsx";
import { Group } from '@mantine/core';


const AnswerList = ({ answers }) => {
  return (
    <div>
      <Group gap="xl" grow>
        {answers.map((answer) => (
          <Answer
            key={answer.id}
            text={answer.text}
            isCorrect={answer.isCorrect}
          />
        ))}
      </Group>
    </div>
  );
};

export default AnswerList;
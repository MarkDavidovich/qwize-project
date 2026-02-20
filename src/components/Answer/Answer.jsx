import style from "./Answer.module.css";
import { Button } from "@mantine/core";

const Answer = ({ text, isCorrect, selected, hasAnswered, onSelect }) => {
  let color = "blue";

  if (hasAnswered) {
    if (isCorrect) {
      color = "green";
    } else if (selected) {
      color = "red";
    }
  }

  return (
    <Button onClick={onSelect} color={color} size="lg" radius="md" fullWidth>
      {text}
    </Button>
  );
};

export default Answer;

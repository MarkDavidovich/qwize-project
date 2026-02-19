import style from "./Answer.module.css";
import { Button } from "@mantine/core";


const Answer = ({ text, isCorrect, selected, onSelect }) => {
  const color = selected && !isCorrect ? "red" : "blue";

  return (
    <Button onClick={onSelect} color={color} size="lg" radius="md">
      {text}
    </Button>
  );
};

export default Answer;

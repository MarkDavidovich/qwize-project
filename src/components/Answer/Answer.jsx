import style from "./Answer.module.css";
import { Button } from "@mantine/core";

const Answer = ({ text, isCorrect, selected, onSelect }) => {
  return (
    <Button
      onClick={onSelect}
      color={selected && isCorrect ? "red" : "blue"}
      fullWidth
    >
      {text}
    </Button>
  );
};

export default Answer;

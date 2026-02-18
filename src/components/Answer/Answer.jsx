import style from "./Answer.module.css";
import { Button } from '@mantine/core';

const [selected, setSelected] = useState(0);

function handleClick() {
  setSelected(true);
}

const Answer = ({ text, isCorrect, handleClick }) => {

  return

  <>
    <Button
      onClick={handleClick}
      color={selected && isCorrect ? "red" : "blue"}
    >
      {text}
    </Button>

  </>;
};

export default Answer;

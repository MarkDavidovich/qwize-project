import { useState } from "react";
import { AnsweringContext } from "./answering-context";

export const AnsweringProvider = ({ children }) => {
  const [isAnswering, setAnswering] = useState(false);

  return <AnsweringContext value={{ isAnswering, setAnswering }}>{children}</AnsweringContext>;
};

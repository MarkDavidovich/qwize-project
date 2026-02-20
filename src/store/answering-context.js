import { createContext, useContext } from "react";

export const AnsweringContext = createContext(null);

export const useAnswering = () => {
  const context = useContext(AnsweringContext);

  if (!context) {
    throw new Error("useAnswering must be used within a AnsweringProvider component");
  }

  return context;
};

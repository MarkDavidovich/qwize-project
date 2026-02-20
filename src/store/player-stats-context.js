import { createContext, useContext } from "react";

export const PlayerStatsContext = createContext(null);

export const usePlayerStats = () => {
  const context = useContext(PlayerStatsContext);

  if (!context) {
    throw new Error("usePlayerStats must be used within a PlayerStatsProvider");
  }

  return context;
};

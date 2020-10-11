import React, { createContext } from "react";

import useGameState from "../hooks/useGameState";
export const GameContext = createContext();

export const GameProvider = (props) => {
  const { gameState, setGameState } = useGameState({
    hinstLeft: 3,
    checkErrorsLeft: 3,
    difficulty: "easy",
    isGameOn: false,
    showModal: true,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {props.children}
    </GameContext.Provider>
  );
};

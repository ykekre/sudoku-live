import React, { createContext, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
import useGameState from "../hooks/useGameState";
export const GameContext = createContext();

export const GameProvider = (props) => {
  const { puzzleState, setPuzzleState } = useGameState({
    puzzle: [],
    solvedPuzzle: [],
    hinstLeft: 3,
    checkErrorsLeft: 3,
    difficulty: "easy",
    isGameOn: false,
  });

  return (
    <GameContext.Provider value={{ puzzleState, setPuzzleState }}>
      {props.children}
    </GameContext.Provider>
  );
};

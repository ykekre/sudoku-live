import React, { createContext } from "react";

import usePuzzleState from "../hooks/usePuzzleState";
export const PuzzleContext = createContext();

export const PuzzleProvider = (props) => {
  const { puzzleState, setPuzzleState } = usePuzzleState({
    plainPuzzleArr: [],
    puzzle: [],
    solvedPuzzle: [],
    activeCell: "",
  });

  return (
    <PuzzleContext.Provider value={{ puzzleState, setPuzzleState }}>
      {props.children}
    </PuzzleContext.Provider>
  );
};

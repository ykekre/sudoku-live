import React, { createContext } from "react";
import usePuzzleState from "../hooks/usePuzzleState";
import { getIndexFromLetter } from "../helperFunctions";

export const PuzzleContext = createContext();

export const PuzzleProvider = (props) => {
  const { puzzleState, setPuzzleState } = usePuzzleState({
    plainPuzzleArr: [],
    puzzle: [],
    solvedPuzzle: [],
    activeCell: "",
    peers: [],
  });

  const changeCellValue = (value, editMode) => {
    const i = getIndexFromLetter(puzzleState.activeCell[0]);
    const j = parseInt(puzzleState.activeCell[1]) - 1;

    /**
     * * do this only if the current cell is editable otherwise return
     */
    if (puzzleState.puzzle[i][j].isMutable) {
      setPuzzleState({
        ...puzzleState,
        puzzle: puzzleState.puzzle.map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            if (rowIndex === i && cellIndex === j) {
              if (!editMode) {
                return { ...cell, values: [value] };
              } else {
                return { ...cell, values: [...cell.values, value] };
              }
            }

            return cell;
          });
        }),
      });
    }

    return;
  };
  return (
    <PuzzleContext.Provider
      value={{ puzzleState, setPuzzleState, changeCellValue }}
    >
      {props.children}
    </PuzzleContext.Provider>
  );
};

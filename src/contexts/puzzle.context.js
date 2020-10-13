import React, { createContext } from "react";
import usePuzzleState from "../hooks/usePuzzleState";
import { getIndexFromLetter, getCoordinates } from "../helperFunctions";

export const PuzzleContext = createContext();

export const PuzzleProvider = (props) => {
  const { puzzleState, setPuzzleState } = usePuzzleState({
    plainPuzzleArr: [],
    puzzle: [],
    solvedPuzzle: [],
    activeCell: "",
    peers: [],
    duplicatePeerCells: [],
  });

  const { activeCell, puzzle, peers } = puzzleState;
  const changeCellValue = (value, editMode) => {
    const [i, j] = getCoordinates(activeCell);
    /**
     * * do this only if the current cell is editable otherwise return
     */
    if (puzzle[i][j].isMutable) {
      setPuzzleState({
        ...puzzleState,
        puzzle: puzzle.map((row, rowIndex) => {
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

        duplicatePeerCells: findDuplicatePeerCells(value),
      });
    }
    return;
  };

  const findDuplicatePeerCells = (value) => {
    /*  const [i, j] = getCoordinates(activeCell);
    let cellValues = puzzle[i][j].values;
    if (cellValues.includes(null)) {
      cellValues = [value];
    } else {
      cellValues.push(value);
    } */
    const arrLookUp = [...peers, activeCell];

    const duplicates = new Map();
    console.log(duplicates);
    arrLookUp.forEach((element, index, arr) => {
      const [i, j] = getCoordinates(element);
      const valuesToTestAgainst = puzzle[i][j].values;
      if (!valuesToTestAgainst.includes(null)) {
        // for (const val of cellValues) {
        if (valuesToTestAgainst.includes(value)) {
          duplicates.set(element, value);
          duplicates.set(activeCell, value);
        }
        // }
      }
    });

    return [...duplicates.keys()];
  };
  return (
    <PuzzleContext.Provider
      value={{
        puzzleState,
        setPuzzleState,
        changeCellValue,
        findDuplicatePeerCells,
      }}
    >
      {props.children}
    </PuzzleContext.Provider>
  );
};

import React, { createContext, useState, useRef } from "react";
import usePuzzleState from "../hooks/usePuzzleState";
import { getCoordinates, getCellIDFromCoords } from "../helperFunctions";

export const PuzzleContext = createContext();

export const PuzzleProvider = (props) => {
  const { puzzleState, setPuzzleState } = usePuzzleState({
    plainPuzzleArr: [],
    puzzle: [],
    solvedPuzzle: [],
  });

  const [activeCell, setActiveCell] = useState("");
  const [peers, setPeers] = useState([]);
  const [duplicatePeerCells, setDuplicatePeerCells] = useState([]);
  const [sameValueCells, setSameValueCells] = useState([]);
  const { puzzle } = puzzleState;
  const puzzleRef = useRef();
  puzzleRef.current = puzzle;
  /**
   *
   * @param {value obtained from the numpad digit on user click} value
   * @param {whether editMode on numpad has been activated or not.If yes, a cell can hold multiple values} editMode
   **
   **This function changes the activeCell value to the value clicked by the user on numpad.
   **In process it also updates the puzzleState.puzzle prop
   */
  const changeCellValue = (value, editMode, inputColor) => {
    const [i, j] = getCoordinates(activeCell);
    /**
     * * do this only if the current cell is editable otherwise return early
     */
    if (puzzle[i][j].isMutable) {
      const updatedPuzzle = puzzle.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          if (rowIndex === i && cellIndex === j) {
            if (!editMode) {
              return { ...cell, values: [value], valueColor: inputColor };
            } else {
              //*if editMode is true, then a cell can hold multiple values
              return {
                ...cell,
                values: [...cell.values, value],
                valueColor: inputColor,
              };
            }
          }

          return cell;
        });
      });

      /**
       * * puzzleRef.current will store the lastest puzzle value
       * * we will use it in the findDuplicatePeerCells fn.
       * * I had to use this because If I just used the puzzleState.puzzle,
       * * it was not reflecting the latest value in the cell. It was showing the value wihch the cell stored
       * * before it was changed.
       *
       * !This behaviour is because we are calling changeCellValue and findDuplicat... from a event handler
       * ! so react will batch the two setState calls in the two fn and render the component only once event handling is finsihed
       */
      puzzleRef.current = updatedPuzzle;
      setPuzzleState({
        ...puzzleState,
        puzzle: updatedPuzzle,
      });
    }

    findDuplicatePeerCells();
    findSameValueCells();
    return;
  };

  /**
   * * This function finds out the peerCells( cells in same row, column and unit as the activeCell)
   * * which have the same value so that they can be styled differently to warn the user
   */
  const findDuplicatePeerCells = () => {
    const [i, j] = getCoordinates(activeCell);
    const cellValues = puzzleRef.current[i][j].values;

    //*Using a map instead of an array so as to avoid having the same cell multiple times
    const duplicates = new Map();

    /**
     * *Loop over the peers and compare the value if each arr element to
     * * the values stored inside the activeCell. If there's a match it means they are duplicates
     * * so add them to the duplicates Map
     */
    peers.forEach((element, index) => {
      const [i, j] = getCoordinates(element);
      const valuesToTestAgainst = puzzleRef.current[i][j].values;
      if (!valuesToTestAgainst.includes(null)) {
        for (const val of cellValues) {
          if (valuesToTestAgainst.includes(val)) {
            duplicates.set(element, val);
            duplicates.set(activeCell, val);
          }
        }
      }
    });

    setDuplicatePeerCells([...duplicates.keys()]);
  };

  /**
   * * when a cell is clicked or the its value changes, this function will be called. It will return an array of cells which have the same value as the cell
   */
  const findSameValueCells = (cell = activeCell) => {
    let sameValues = [];
    const [i, j] = getCoordinates(cell);
    const puzzle = puzzleRef.current;
    /**
     * * if the cell is empty set sameValueCells arr empty and return early
     * *this is to avoid carryover of sameValueCells arr from prev render
     * * when a blank cell is clicked
     */
    if (puzzle[i][j].values.includes(null)) {
      setSameValueCells([]);
      return;
    }
    const cellValues = puzzle[i][j].values;

    puzzle.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        for (const val of cellValues) {
          if (col.values.includes(val)) {
            sameValues.push(getCellIDFromCoords(rowIndex, colIndex));
          }
        }
      });
    });

    /* sameValues = puzzle.map((row, index) => {
      return row.map((col, colIndex) => {
        for (const val of cellValues) {
          if (col.values.includes(val)) {
            return true;
          }
        }
      });
    }); */

    setSameValueCells(sameValues);
  };
  return (
    <PuzzleContext.Provider
      value={{
        puzzleState,
        setPuzzleState,
        activeCell,
        setActiveCell,
        peers,
        setPeers,
        duplicatePeerCells,
        findSameValueCells,
        changeCellValue,

        sameValueCells,
      }}
    >
      {props.children}
    </PuzzleContext.Provider>
  );
};

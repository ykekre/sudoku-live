import React, { createContext, useState, useRef, useEffect } from "react";
import usePuzzleState from "../hooks/usePuzzleState";
import { getCoordinates, getCellIDFromCoords } from "../helperFunctions";

export const PuzzleContext = createContext();

export const PuzzleProvider = (props) => {
  const { puzzleState, setPuzzleState } = usePuzzleState({
    originalPuzzle: [],
    puzzle: [],
    solvedPuzzle: [],
  });

  const [activeCell, setActiveCell] = useState("");
  const [peers, setPeers] = useState([]);
  const [duplicatePeerCells, setDuplicatePeerCells] = useState([]);
  const [sameValueCells, setSameValueCells] = useState([]);
  const [digitsValuesMap, setDigitsValuesMap] = useState(new Map());
  const [isSolved, setIsSolved] = useState(false);
  const { puzzle, solvedPuzzle, originalPuzzle } = puzzleState;
  const puzzleRef = useRef();
  puzzleRef.current = puzzle;

  useEffect(() => {
    /**
     * *Everytime puzzle is updated calculate the digits to values (in puzzle) map and use this mapping to update badges on numpad
     */
    const digitsMap = new Map();
    let wrongValues = 0; //*counter for values which are not as per actual solved puzzle
    puzzle.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const values = col.values;

        if (!values.includes(null)) {
          for (const val of values) {
            if (digitsMap.has(val)) {
              let count = digitsMap.get(val);
              digitsMap.set(val, ++count);
            } else {
              digitsMap.set(val, 1);
            }
          }

          /**
           * *If a cell has more than one value we do not need to evaluate
           * * whether puzzle has been solved
           */
          if (values.length === 1) {
            values[0] !== solvedPuzzle[rowIndex][colIndex] && wrongValues++;
          }
        }
      });
    });
    setDigitsValuesMap(digitsMap);

    /**
     * *if no wrong values means puzzle has been solved
     */
    wrongValues === 0 ? setIsSolved(true) : setIsSolved(false);
  }, [puzzle, solvedPuzzle]);
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
              /**
               * *if editMode is true, then a cell can hold multiple values
               * ?things to do:
               * *1. if incoming value is already in values array then remove that element otherwise, add the value to the array
               * */
              let updatedValues = [];
              if (cell.values.includes(value)) {
                updatedValues = cell.values.filter((val) => val !== value);
              } else {
                updatedValues = [...cell.values, value];
              }
              return {
                ...cell,
                values: updatedValues,
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

  /**
   * * Function will be called to render solved puzzle
   */
  const solvePuzzle = () => {
    setPuzzleState({
      ...puzzleState,
      puzzle: puzzle.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          return {
            ...cell,
            values: [solvedPuzzle[rowIndex][cellIndex]],
            valueColor: "",
          };
        });
      }),
    });
  };

  /**
   * * Function will be called to undo any changes and render puzzle to its initial state
   */
  const resetPuzzle = () => {
    setPuzzleState({
      ...puzzleState,
      puzzle: puzzle.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          return {
            ...cell,
            values: originalPuzzle[rowIndex][cellIndex].values,
            valueColor: "",
          };
        });
      }),
    });
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
        digitsValuesMap,
        sameValueCells,
        isSolved,
        resetPuzzle,
        solvePuzzle,
      }}
    >
      {props.children}
    </PuzzleContext.Provider>
  );
};

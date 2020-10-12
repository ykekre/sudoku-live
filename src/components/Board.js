import React, { useContext } from "react";
import Cell from "./Cell";
import "../styles/base/_shared.scss";
import "../styles/components/_board.scss";
import { PuzzleContext } from "../contexts/puzzle.context";
import { getLetterFromIndex } from "../helperFunctions";
import { findPeers, unitlist, units } from "../model/vendor/sudoku";

function Board() {
  const { puzzleState, setPuzzleState } = useContext(PuzzleContext);

  const board = puzzleState.puzzle;

  const highlightPeersOfActiveCell = (cell) => {
    const peers = findPeers(cell);

    setPuzzleState({
      ...puzzleState,
      peers,
      activeCell: cell,
    });
  };
  const makeRow = (row) => {
    return Array(9)
      .fill(null)
      .map((el, index) => {
        /**
         ** to convert cell id to the format: A1,B3,C4 etc
         *
         */
        const cell = `${getLetterFromIndex(row)}${index + 1}`;

        return (
          <Cell
            cell={cell}
            /**
             * ? array of values a cell can hold
             */
            values={board[row][index].values}
            /**

             * ?if Cell is pre-populated it means its not editable
             */

            isEditable={board[row][index].isMutable}
            key={`${row}-${index}`}
            /**
             ** highlightPeers will be invoked from the cell component with it's id
             */
            highlightPeers={highlightPeersOfActiveCell}
            /**
             * *To determine whether a cell is a peer cell or not
             * *to style these cells differently
             */
            isPeer={puzzleState.peers.includes(cell)}
            /**
             * *To style an active cell differently
             */
            isActive={puzzleState.activeCell === cell}
          />
        );
      });
  };

  const makeTable = () => {
    return Array(9)
      .fill(null)
      .map((el, index) => (
        <tr id={index + 1} key={index}>
          {makeRow(index)}
        </tr>
      ));
  };

  return (
    <table className="board">
      <tbody>{makeTable()}</tbody>
    </table>
  );
}

export default Board;

import React, { useContext } from "react";
import Cell from "./Cell";
import "../styles/base/_shared.scss";
import "../styles/components/_board.scss";
import { PuzzleContext } from "../contexts/puzzle.context";

function Board() {
  const { puzzleState } = useContext(PuzzleContext);

  const board = puzzleState.puzzle;

  const makeRow = (row) => {
    return Array(9)
      .fill(null)
      .map((el, index) => (
        <Cell
          i={row}
          j={index}
          /**
           * ? array of values a cell can hold
           *
           */
          values={board[row][index].values}
          /**
           *
           * ?if Cell is pre-populated it means its not editable
           */

          isEditable={board[row][index].isMutable}
          key={`${row}-${index}`}
        />
      ));
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

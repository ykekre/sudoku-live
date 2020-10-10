import React, { useContext } from "react";

import Cell from "./Cell";
import "../styles/base/_shared.scss";
import "../styles/components/_board.scss";
import { GameContext } from "../contexts/game.context";

function Board(props) {
  const { puzzleState, setPuzzleState } = useContext(GameContext);
  const board = puzzleState.puzzle;
  /* setPuzzleState({
    puzzle: board,
    solvedPuzzle: solvedBoard,
  }); */
  const makeRow = (row) => {
    return Array(9)
      .fill(null)
      .map((el, index) => (
        <Cell
          i={row}
          j={index}
          values={board[row][index].values}
          isEditable={board[row][index].isMutable}
        />
      ));
  };

  const makeTable = () => {
    return Array(9)
      .fill(null)
      .map((el, index) => <tr id={index}>{makeRow(index)}</tr>);
  };

  return (
    <table className="board">
      <tbody> {makeTable()}</tbody>
    </table>
  );
}

export default Board;

import React from "react";
import Puzzle from "../model/Puzzle";
import Cell from "./Cell";
import "../styles/components/_board.scss";

const testPuzzle = new Puzzle("easy");
const puzzle = testPuzzle.setBoard();
const board = testPuzzle.transformPuzzle();
console.log(puzzle);

const makeRow = (row) => {
  return Array(9)
    .fill(null)
    .map((el, index) => <Cell i={row} j={index} el={board[row][index]} />);
};

const makeTable = () => {
  return Array(9)
    .fill(null)
    .map((el, index) => <tr id={index}>{makeRow(index)}</tr>);
};

function Board() {
  // return puzzle.map((el) => <Cell value={el} />);

  return (
    <table className="board">
      <tbody> {makeTable()}</tbody>
    </table>
  );
}

export default Board;

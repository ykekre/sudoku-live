import React, { useContext } from "react";
import Cell from "./Cell";
import "../styles/base/_shared.scss";
import "../styles/components/_board.scss";
import { PuzzleContext } from "../contexts/puzzle.context";
import { getLetterFromIndex } from "../helperFunctions";
import { findPeers, unitlist } from "../model/vendor/sudoku";

/**
 * The Sudoku board is 9x9.
 *    A1 A2 A3 A4 A5 A6 A7 A8 A9
 *    B1 B2 B3 B4 B5 B6 B7 B8 B9
 *    C1 C2 C3 C4 C5 C6 C7 C8 C9
 *    D1 D2 D3 D4 D5 D6 D7 D8 D9
 *    E1 E2 E3 E4 E5 E6 E7 E8 E9
 *    F1 F2 F3 F4 F5 F6 F7 F8 F9
 *    G1 G2 G3 G4 G5 G6 G7 G8 G9
 *    H1 H2 H3 H4 H5 H6 H7 H8 H9
 *    I1 I2 I3 I4 I5 I6 I7 I8 I9
 *
 * ?It can be considered to be comprised of 9 Unites
 * ?each, stacked in a 3x3 formation.
 * ?Like this: Unit1 Unit2 Unit3
 * ?           Unit4 Unit5 Unit6
 * ?           Unit7 Unit8 Unit9
 *
 * In turn, each Unit is comprised of 9 cells stacked
 * in a 3x3 formation as above. This gives us the below
 * representation:
 *      Unit1        Unit2        Unit3
 *    A1 A2 A3    A4 A5 A6    A7 A8 A9
 *    B1 B2 B3    B4 B5 B6    B7 B8 B9
 *    C1 C2 C3    C4 C5 C6    C7 C8 C9
 *      Unit4        Unit5        Unit6
 *    D1 D2 D3    D4 D5 D6    D7 D8 D9
 *    E1 E2 E3    E4 E5 E6    E7 E8 E9
 *    F1 F2 F3    F4 F5 F6    F7 F8 F9
 *      Unit7        Unit8        Unit9
 *    G1 G2 G3    G4 G5 G6    G7 G8 G9
 *    H1 H2 H3    H4 H5 H6    H7 H8 H9
 *    I1 I2 I3    I4 I5 I6    I7 I8 I9
 *
 * For example, Unit1 has the following cells:
 * Unit1: A1 A2 A3
 *       B1 B2 B3
 *       C1 C2 C3
 *
 *? So in Unit1,
 * ?   Cell1: A1   Cell2: A2   Cell3: A3
 * ?  Cell4: B1   Cell5: B2   Cell6: B3
 * ?  Cell7: C1   Cell8: C2   Cell9: C3
 *
 * and in Unit8,
 *    Cell1: G4   Cell2: G5   Cell3: G6
 *    Cell4: H4   Cell5: H5   Cell6: H6
 *    Cell7: I4   Cell8: I5   Cell9: I6
 *
 * and so on...
 */
const blocks = [
  ...unitlist[19],
  ...unitlist[21],
  ...unitlist[23],
  ...unitlist[25],
];
function Board() {
  const {
    puzzleState,
    setPeers,
    setActiveCell,
    activeCell,
    peers,
    duplicatePeerCells,
    findSameValueCells,
    sameValueCells,
    wrongInputCells,
  } = useContext(PuzzleContext);

  const board = puzzleState.puzzle;

  /**
   * @param {puzzle cell that was clicked} cell
   * *The below function will find out the peers of a cell
   * *i.e the cells in same row, column and unit
   * !This fn is passed down as a prop to Cell component
   */
  const findPeersOfActiveCell = (cell) => {
    const peers = findPeers(cell);
    setPeers(peers);
    setActiveCell(cell);
  };

  /**
   * @param {puzzle cell that was clicked} cell
   * *The below function will invoke the findSameValueCells fn
   * * which will set the arr of cells which have same value
   * *in the puzzle
   * !This fn is passed down as a prop to Cell component
   */
  const highlightSameCells = (cell) => {
    findSameValueCells(cell);
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
            /**
             * * style alternate blocks
             */
            isAltBlock={blocks.includes(cell)}
            key={`${row}-${index}`}
            /**
             ** highlightPeers will be invoked from the cell component with it's id
             */
            highlightPeers={findPeersOfActiveCell}
            /**
             * *To determine whether a cell is a peer cell or not
             * *to style these cells differently
             */
            isPeer={peers.includes(cell)}
            /**
             * *To style an active cell differently
             */
            isActive={activeCell === cell}
            /**
             * *duplicate peer cells are the peer cells having same value
             * * which are not allowed, so we style them differently to warn ** the user
             */
            isDuplicate={duplicatePeerCells.includes(cell)}
            /**
             * *set the font color of the cell value to refelct the color selected by user
             */
            color={board[row][index].valueColor}
            highlightSameCells={highlightSameCells}
            /**
             * * highlight same value cells
             */
            isSameValue={sameValueCells.includes(cell)}
            /**
             * * highlight incorrect user input cells
             */
            isWrongInput={wrongInputCells.includes(cell)}
          />
        );
      });
  };
  return (
    <table className="board">
      <tbody>{makeTable()}</tbody>
    </table>
  );
}

export default Board;

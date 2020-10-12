import React, { useContext } from "react";
import { PuzzleContext } from "../contexts/puzzle.context";
import { NumpadContext } from "../contexts/numpad.context";
import { getLetterFromIndex } from "../helperFunctions";
/**
 * The Sudoku position is 9x9.
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
 * It can be considered to be comprised of 9 boxes
 * each, stacked in a 3x3 formation.
 * Like this: Box1 Box2 Box3
 *            Box4 Box5 Box6
 *            Box7 Box8 Box9
 *
 * In turn, each box is comprised of 9 cells stacked
 * in a 3x3 formation as above. This gives us the below
 * representation:
 *      Box1        Box2        Box3
 *    A1 A2 A3    A4 A5 A6    A7 A8 A9
 *    B1 B2 B3    B4 B5 B6    B7 B8 B9
 *    C1 C2 C3    C4 C5 C6    C7 C8 C9
 *      Box4        Box5        Box6
 *    D1 D2 D3    D4 D5 D6    D7 D8 D9
 *    E1 E2 E3    E4 E5 E6    E7 E8 E9
 *    F1 F2 F3    F4 F5 F6    F7 F8 F9
 *      Box7        Box8        Box9
 *    G1 G2 G3    G4 G5 G6    G7 G8 G9
 *    H1 H2 H3    H4 H5 H6    H7 H8 H9
 *    I1 I2 I3    I4 I5 I6    I7 I8 I9
 *
 * For example, Box1 has the following cells:
 * Box1: A1 A2 A3
 *       B1 B2 B3
 *       C1 C2 C3
 *
 * So in Box1,
 *    Cell1: A1   Cell2: A2   Cell3: A3
 *    Cell4: B1   Cell5: B2   Cell6: B3
 *    Cell7: C1   Cell8: C2   Cell9: C3
 *
 * and in Box8,
 *    Cell1: G4   Cell2: G5   Cell3: G6
 *    Cell4: H4   Cell5: H5   Cell6: H6
 *    Cell7: I4   Cell8: I5   Cell9: I6
 *
 * and so on...
 */

const Cell = (props) => {
  const { i, j, values, isEditable } = props;
  const { puzzleState, setPuzzleState } = useContext(PuzzleContext);
  const { numpadState, setNumpadState } = useContext(NumpadContext);
  const handleClick = (e) => {
    setPuzzleState({
      ...puzzleState,
      activeCell: e.target.id,
    });

    setNumpadState({
      ...numpadState,
      inFocus: true,
    });
  };

  return (
    <td
      id={`${getLetterFromIndex(i)}${j + 1}`}
      className={isEditable ? "editable" : "non-editable"}
      onClick={handleClick}
    >
      {values.map((val) => val)}
    </td>
  );
};

export default Cell;

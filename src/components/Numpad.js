import React, { useContext } from "react";
import { NumpadContext } from "../contexts/numpad.context";
import { PuzzleContext } from "../contexts/puzzle.context";
import "../styles/components/_numpad.scss";

const Numpad = ({ isInFocus }) => {
  const { numpadState, setNumpadState } = useContext(NumpadContext);
  const { changeCellValue } = useContext(PuzzleContext);

  const { editMode, color } = numpadState;
  /**
   * * The handleClick function will do the foll:
   * ?1. if user clicked on a number, get that value
   * ?2. if user clicked on palette icon, change the color of all values inside numpad
   * ?3. if user clicked on edit icon, toggle the edit mode state
   */

  function handleClick(e) {
    const cell = e.target.closest(".numpad-item");
    const cellID = cell.id.toString();

    /**
     * * set numpad value
     */
    if (cellID.includes("digit")) {
      let numpadValue = parseInt(cellID.slice(-1));

      setNumpadState({
        ...numpadState,
        value: numpadValue,
      });

      /**
       * * change the cell value to reflect this numpad value
       */
      changeCellValue(numpadValue, editMode);
    }

    /**
     * * change the numpad values color
     */
    if (cellID.includes("color")) {
      changeColor();
    }

    /**
     * * toggle the edit mode
     */
    if (cellID.includes("draft")) {
      setNumpadState({
        ...numpadState,
        editMode: !editMode,
      });
    }
  }

  const changeColor = () => {
    const colors = ["default-color", "second-color", "third-color"];

    let curColorIndex = colors.findIndex((el) => el === color);

    /**
     * *pick the next color when user clicks on the palette icon
     */
    const newColor = colors[++curColorIndex % colors.length];

    setNumpadState({
      ...numpadState,
      color: newColor,
    });

    return;
  };
  return (
    <div
      className={`numpad  ${isInFocus ? "" : "halffade"} ${color}`}
      onClick={handleClick}
    >
      <ul className="numpad-row  ">
        <li className="numpad-item " id="digit-1">
          <span className="badge badge-light numpad-item--badge count-1">
            0
          </span>
          1
        </li>
        <li className="numpad-item " id="digit-2">
          <span className="badge badge-light numpad-item--badge count-2">
            0
          </span>
          2
        </li>
        <li className="numpad-item " id="digit-3">
          <span className="badge badge-light numpad-item--badge count-3">
            0
          </span>
          3
        </li>
        <li className="numpad-item " id="digit-4">
          <span className="badge badge-light numpad-item--badge count-4">
            0
          </span>
          4
        </li>
        <li className="numpad-item " id="digit-5">
          <span className="badge badge-light numpad-item--badge count-5">
            0
          </span>
          5
        </li>
        <li className="numpad-item " id="digit-6">
          <span className="badge badge-light numpad-item--badge count-6">
            0
          </span>
          6
        </li>
      </ul>
      <ul className="numpad-row  ">
        <li className="numpad-item " id="digit-7">
          <span className="badge badge-light numpad-item--badge count-7">
            0
          </span>
          7
        </li>
        <li className="numpad-item " id="digit-8">
          <span className="badge badge-light numpad-item--badge count-8">
            0
          </span>
          8
        </li>
        <li className="numpad-item " id="digit-9">
          <span className="badge badge-light numpad-item--badge count-9">
            0
          </span>
          9
        </li>
        <li className="numpad-item " id="numpad-draft" onClick={handleClick}>
          <span className="fa-stack ">
            <i className="fas fa-edit fa-stack-1x"></i>
            <i
              /**
               * * if the editMode is false show the ban icon on top of the edit icon, otheriwse hide it
               */
              className={`fas fa-ban fa-stack-2x ${editMode ? "fade" : ""}`}
              style={{ color: "Tomato" }}
            ></i>
          </span>
        </li>
        <li className="numpad-item " id="numpad-color">
          <i className="fas fa-palette" onClick={handleClick}></i>
        </li>
        <li className="numpad-item " id="numpad-clear" onClick={handleClick}>
          <i className="fas fa-backspace"></i>
        </li>
      </ul>
    </div>
  );
};

export default Numpad;

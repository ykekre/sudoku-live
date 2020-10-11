import React, { useContext } from "react";
// import { GameContext } from "../contexts/game.context";
import "../styles/components/_numpad.scss";
const inputBlue = "#4c3b78cc";
const second = "#60A36C";
const third = "#D4847E";

/* export function showBadgeCount() {
  for (let index = 1; index < 10; index++) {
    const digits = badgeCounter();
    document.querySelector(`.count-${index}`).textContent = digits.get(index);
  }
}

export function badgeCounter() {
  const digits = new Map();

  for (let i = 1; i < 10; i++) {
    digits.set(i, 0);
  }

  for (const square of squares) {
    if (!hasMorethanOneValue(square)) {
      const digit = getSquareValue(square);
      if (digit && digits.has(digit)) {
        let count = digits.get(digit);
        count = count + 1;
        digits.set(digit, count);
      }
    }
  }
  return digits;
} */
const Numpad = () => {
  // const { puzzleState, setPuzzleState } = useContext(GameContext);

  function handleClick(e) {
    let value = e.target.id.toString();

    if (value.includes("digit")) {
      value = parseInt(value.slice(-1));
    }

    // changeCellValue(value);
  }

  /* function changeCellValue(value) {
    const{num}
  } */
  return (
    <div className="numpad  halffade default-blue" onClick={handleClick}>
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
        <li className="numpad-item " id="numpad-draft">
          <span className="fa-stack ">
            <i className="fas fa-edit fa-stack-1x"></i>
            <i
              className="fas fa-ban fa-stack-2x"
              style={{ color: "Tomato" }}
            ></i>
          </span>
        </li>
        <li className="numpad-item " id="numpad-color">
          <i className="fas fa-palette"></i>
        </li>
        <li className="numpad-item " id="numpad-clear">
          <i className="fas fa-backspace"></i>
        </li>
      </ul>
    </div>
  );
};

export default Numpad;

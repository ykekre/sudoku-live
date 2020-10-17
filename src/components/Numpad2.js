import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import { NumpadContext } from "../contexts/numpad.context";
import { PuzzleContext } from "../contexts/puzzle.context";
import "../styles/components/_numpad2.scss";

export default function Numpad2({ isInFocus }) {
  const { numpadState, setNumpadState } = useContext(NumpadContext);
  const {
    activeCell,
    changeCellValue,
    digitsValuesMap,
    clearCellValue,
  } = useContext(PuzzleContext);

  const { editMode, color } = numpadState;

  const handleOnClickNum = (value) => {
    if (activeCell.length > 0) changeCellValue(value, editMode, color);
    else return;
  };
  /**
   * *Below function cycles through three colors,when user clicks on the palette icon, and sets that color as the user input color and the font color for the numpad
   */
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
    <div className={`numpad ${isInFocus ? "" : "halffade"} ${color} `}>
      <List aria-label="numpad" className="numpad__items">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          return (
            <Badge
              badgeContent={digitsValuesMap.get(num)}
              color="primary"
              className={`numpad__item  numpad__item__badge numpad__item--${num}`}
              /**
               * * On click invoke changeCellValue fn to change the cell value to user clicked number
               */
              onClick={() => handleOnClickNum(num)}
            >
              <ListItem
                button
                className={`numpad__item numpad__item--${num}`}
                id={`digit-${num}`}
                onClick={() => handleOnClickNum(num)}
              >
                {num}
              </ListItem>
            </Badge>
          );
        })}
      </List>
      <List className="numpad__control">
        <ListItem
          button
          className="control__options control__options--draft"
          id="numpad__draft"
          onClick={() =>
            setNumpadState({
              ...numpadState,
              editMode: !editMode,
            })
          }
        >
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
        </ListItem>

        <ListItem
          button
          className="control__options control__options--color"
          id="numpad__color"
          onClick={() => changeColor()}
        >
          <i className="fas fa-palette"></i>
        </ListItem>
        <ListItem
          button
          className="control__options control__options--clear"
          id="numpad__clear"
          onClick={() => clearCellValue()}
        >
          <i className="fas fa-backspace"></i>
        </ListItem>
      </List>
    </div>
  );
}

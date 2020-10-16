import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import { NumpadContext } from "../contexts/numpad.context";
import { PuzzleContext } from "../contexts/puzzle.context";
import "../styles/components/_numpad2.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Numpad2({ isInFocus }) {
  const classes = useStyles();
  const { numpadState, setNumpadState } = useContext(NumpadContext);
  const { changeCellValue, digitsValuesMap } = useContext(PuzzleContext);

  const { editMode, color } = numpadState;

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
      className={`numpad ${isInFocus ? "" : "halffade"} ${color} ${
        classes.root
      }`}
    >
      <List aria-label="numpad" className="numpad__items">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          return (
            <Badge
              badgeContent={digitsValuesMap.get(num)}
              color="primary"
              className={`numpad__item  numpad__item__badge numpad__item--${num}`}
              /**
               * * On click invoke changeCellValue fn to change the cell value to user clicked number
               */
              onClick={() => changeCellValue(num, editMode, color)}
            >
              <ListItem
                button
                className={`numpad__item numpad__item--${num}`}
                id={`digit-${num}`}
                onClick={() => changeCellValue(num, editMode, color)}
              >
                {num}
              </ListItem>
            </Badge>
          );
        })}
        {/* </List> */}
        {/* <Divider orientation="vertical" flexItem /> */}
        {/* <List className="numpad__columns"> */}
        {[7, 8, 9].map((num) => {
          return (
            <Badge
              badgeContent={digitsValuesMap.get(num)}
              color="primary"
              className={`numpad__item numpad__item__badge numpad__item--${num}`}
              onClick={() => changeCellValue(num, editMode, color)}
            >
              <ListItem
                button
                className="numpad__item"
                id={`digit-${num}`}
                onClick={() => changeCellValue(num, editMode, color)}
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
        >
          <i className="fas fa-backspace"></i>
        </ListItem>
      </List>
    </div>
  );
}

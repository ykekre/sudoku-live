import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "../contexts/game.context";
import { PuzzleContext } from "../contexts/puzzle.context";
import "../styles/components/_sidebar.scss";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function Sidebar({ closeDrawer }) {
  const classes = useStyles();
  const { prepareForNewGame, triggerSnackBarOpen } = useContext(GameContext);
  const {
    resetPuzzle,
    solvePuzzle,
    checkWrongUserInputs,
    activeCell,
    revealCellValue,
  } = useContext(PuzzleContext);

  const handleClick = (e, id) => {
    switch (id) {
      case "new":
        prepareForNewGame();

        break;
      case "reset":
        resetPuzzle();
        triggerSnackBarOpen(`Puzzle has been reset to initial state.`);
        break;
      case "solve":
        solvePuzzle();

        break;

      case "errors":
        checkWrongUserInputs();

        break;

      case "reveal":
        {
          if (revealCellValue() === 404) {
            triggerSnackBarOpen(
              `You need to click on a blank cell to see it's value`
            );
          } else if (revealCellValue() === 403) {
            triggerSnackBarOpen(
              `You clicked on a pre-filled cell. Use this option to see true value of a blank cell`
            );
          }
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className={`Sidebar ${classes.root}`}>
      {[
        { text: "New Puzzle", secondaryText: "Start a New Game", id: "new" },
        {
          text: "Reset Puzzle",
          secondaryText: "Reset all progress and restart puzzle",
          id: "reset",
        },
        {
          text: "Solve Puzzle",
          secondaryText: "See the puzzle solution",
          id: "solve",
        },
        {
          text: "Check Errors",
          secondaryText: "See all incorrect inputs",
          id: "errors",
        },
        {
          text: "Get Help",
          secondaryText: "Reveal any cell's actual value",
          id: "reveal",
        },
      ].map((option) => (
        <Option
          selection={handleClick}
          option={option}
          key={option.id}
          closeDrawer={closeDrawer}
        />
      ))}
    </div>
  );
}

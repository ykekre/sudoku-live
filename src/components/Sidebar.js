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
export default function Sidebar() {
  const classes = useStyles();
  const { prepareForNewGame } = useContext(GameContext);
  const { resetPuzzle, solvePuzzle, checkWrongUserInputs } = useContext(
    PuzzleContext
  );

  const handleClick = (e, id) => {
    switch (id) {
      case "new":
        prepareForNewGame();

        break;
      case "reset":
        resetPuzzle();

        break;
      case "solve":
        solvePuzzle();

        break;

      case "errors":
        checkWrongUserInputs();

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
      ].map((option) => (
        <Option selection={handleClick} option={option} key={option.id} />
      ))}
    </div>
  );
}

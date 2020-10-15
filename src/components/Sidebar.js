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
  const { resetPuzzle, solvePuzzle } = useContext(PuzzleContext);

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
      default:
        break;
    }
  };

  return (
    <div className={`Sidebar classes.root`}>
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
          text: "Get Hint",
          secondaryText: "Fill up one random cell",
          id: "hint",
        },
      ].map((option) => (
        <Option selection={handleClick} option={option} />
      ))}
    </div>
  );
}

import React, { createContext, useState } from "react";
import Puzzle from "../model/Puzzle";
import useGameState from "../hooks/useGameState";
import { v4 as uuidv4 } from "uuid";
export const GameContext = createContext();

export const GameProvider = (props) => {
  const { gameState, setGameState } = useGameState({
    hinstLeft: 3,
    checkErrorsLeft: 3,
    difficulty: "easy",
    isGameOn: false,
    showModal: true,
    puzzleObj: new Puzzle("easy"),
    puzzleID: uuidv4(),
  });

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    text: "",
  });

  const triggerSnackBarOpen = (message) => {
    setSnackBar({
      isOpen: true,
      text: message,
    });
  };

  const triggerSnackBarClose = () => {
    setSnackBar({
      isOpen: false,
      text: "",
    });
  };
  const prepareForNewGame = () => {
    setGameState({
      ...gameState,
      isGameOn: false,
      showModal: true,
    });
  };
  const startNewGame = (level) => {
    const puzzleObj = new Puzzle(level);

    setGameState({
      ...gameState,
      isGameOn: true,
      puzzleObj: puzzleObj,
      //?boolean to decide whether to show puzzle selector dialog or not
      showModal: false,
      difficulty: level,
      puzzleID: uuidv4(),
    });
  };
  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        startNewGame,
        prepareForNewGame,
        snackBar,

        triggerSnackBarOpen,
        triggerSnackBarClose,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

import React, { useContext } from "react";
import Board from "./components/Board.js";
import Numpad from "./components/Numpad.js";
import Puzzle from "./model/Puzzle";
import "./styles/layout/_layout.scss";
import { GameContext } from "./contexts/game.context";
import { PuzzleContext } from "./contexts/puzzle.context";
import SelectPuzzleTypeDialog from "./components/SelectPuzzleTypeDialog.js";

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { puzzleState, setPuzzleState } = useContext(PuzzleContext);

  const startGame = (difficulty) => {
    const puzzleObj = new Puzzle(difficulty);

    //? A 2-D array(9x9) representation of a sudoku board
    const board = puzzleObj.setBoard();

    //? 1-D array of puzzle with 81 values
    const plainPuzzleArr = puzzleObj.board;

    //?A 2-D solved sudoku board
    const solvedBoard = puzzleObj.solvedBoard();

    setGameState({
      ...gameState,

      isGameOn: true,

      //?boolean to decide whether to show puzzle selector dialog or not
      showModal: false,
      difficulty,
    });

    setPuzzleState({
      ...puzzleState,
      plainPuzzleArr,
      puzzle: board,
      solvedPuzzle: solvedBoard,
    });
  };
  return gameState.isGameOn ? (
    <div className="container">
      <header />

      <section>
        <Board />
      </section>

      <div className="side-bar"></div>

      <div className="num-pad-section">
        <Numpad isInFocus={puzzleState.activeCell.length > 0} />
      </div>

      <footer />
    </div>
  ) : (
    //* If game is not on show the puzzle selector modal instead
    <SelectPuzzleTypeDialog startGame={startGame} />
  );
};

export default Game;

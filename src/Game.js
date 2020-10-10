import React, { useContext } from "react";
import Board from "./components/Board.js";
import Numpad from "./components/Numpad.js";
import Puzzle from "./model/Puzzle";
import "./styles/layout/_layout.scss";
import { GameContext } from "./contexts/game.context";
import SelectPuzzleTypeDialog from "./components/SelectPuzzleTypeDialog.js";

const Game = () => {
  const { puzzleState, setPuzzleState } = useContext(GameContext);

  const startGame = () => {
    const { difficulty } = puzzleState;

    const puzzleObj = new Puzzle(difficulty);
    const board = puzzleObj.setBoard();
    console.log(board);
    const solvedBoard = puzzleObj.solvedBoard();

    setPuzzleState({
      puzzle: board,
      solvedPuzzle: solvedBoard,
      isGameOn: true,
    });
  };
  return puzzleState.isGameOn ? (
    <div className="container">
      <header></header>
      <section>
        <Board />
      </section>
      <div className="side-bar"></div>
      <div className="num-pad-section">
        <Numpad />
      </div>
      <footer></footer>
    </div>
  ) : (
    <SelectPuzzleTypeDialog startGame={startGame} />
  );
};

export default Game;

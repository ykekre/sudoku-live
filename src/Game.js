import React, { useContext } from "react";
import Board from "./components/Board.js";
import Numpad from "./components/Numpad.js";
import Puzzle from "./model/Puzzle";
import "./styles/layout/_layout.scss";
import { GameContext } from "./contexts/game.context";
import { PuzzleContext } from "./contexts/puzzle.context";
import { NumpadProvider } from "./contexts/numpad.context";
import SelectPuzzleTypeDialog from "./components/SelectPuzzleTypeDialog.js";

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { puzzleState, setPuzzleState } = useContext(PuzzleContext);

  const startGame = (difficulty) => {
    const puzzleObj = new Puzzle(difficulty);
    const board = puzzleObj.setBoard();
    const plainPuzzleArr = puzzleObj.board;

    const solvedBoard = puzzleObj.solvedBoard();

    setGameState({
      ...gameState,

      isGameOn: true,
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
      <header></header>

      <section>
        <Board />
      </section>

      <div className="side-bar"></div>
      <NumpadProvider>
        <div className="num-pad-section">
          <Numpad />
        </div>
      </NumpadProvider>
      <footer></footer>
    </div>
  ) : (
    <SelectPuzzleTypeDialog startGame={startGame} />
  );
};

export default Game;

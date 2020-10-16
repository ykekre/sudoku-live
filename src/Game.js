import React, { useContext, useEffect } from "react";
import HeaderBar from "./components/AppBar.js";
import Board from "./components/Board.js";
import Sidebar from "./components/Sidebar.js";
import "./styles/layout/_layout.scss";
import { GameContext } from "./contexts/game.context";
import { PuzzleContext } from "./contexts/puzzle.context";
import SelectPuzzleTypeDialog from "./components/SelectPuzzleTypeDialog.js";
import { Paper } from "@material-ui/core";
const Game = () => {
  const { gameState } = useContext(GameContext);
  const { puzzleState, setPuzzleState } = useContext(PuzzleContext);
  const { puzzleObj, isGameOn, puzzleID } = gameState;

  useEffect(() => {
    if (puzzleID !== puzzleState.ID) {
      /**
       * * if puzzleID has been changed it means a new puzzle obj has been created and we need to use this object to create a new puzzle and set its state
       ** else we can continue using the puzzle state
       */
      //? A 2-D array(9x9) representation of a sudoku board
      const generatedBoard = puzzleObj.setBoard();

      //? 1-D array of puzzle with 81 values
      const plainPuzzleArr = puzzleObj.board;

      //?A 2-D solved sudoku board
      const solvedBoard = puzzleObj.solvedBoard();

      setPuzzleState({
        ...puzzleState,
        plainPuzzleArr,
        puzzle: generatedBoard,
        solvedPuzzle: solvedBoard,
        originalPuzzle: generatedBoard,
        ID: puzzleID,
      });
    }
  }, [puzzleID]);

  return isGameOn ? (
    <div className="container">
      <header>
        <HeaderBar />
      </header>
      <section>
        <Paper elevation={1}>
          <Board />
        </Paper>
      </section>
      <div className="side-bar">
        <Paper elevation={2}>
          <Sidebar />
        </Paper>
      </div>

      <footer />
    </div>
  ) : (
    <SelectPuzzleTypeDialog />
  );
};

export default Game;

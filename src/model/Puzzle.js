// import { isNull } from "util";
import sudoku from "sudoku";

export default class Puzzle {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.board = [];
    this.solvedPuzzle = [];
  }

  getPuzzle() {
    return sudoku.makepuzzle();
  }

  getRating(puzzle) {
    return sudoku.ratepuzzle(puzzle, 4);
  }

  getDifficulty() {
    return this.difficulty;
  }

  getEasy() {
    while (true) {
      let test = this.getPuzzle();
      this.solvedPuzzle = sudoku
        .solvepuzzle(test)
        .map((el) => (el === null ? null : el + 1));
      if (this.getRating(test) < 0.5) {
        this.board = test.map((el) => (el === null ? null : el + 1));
        return;
      }
    }
  }

  getMedium() {
    while (true) {
      let test = this.getPuzzle();
      let rating = this.getRating(test);
      this.solvedPuzzle = sudoku.solvepuzzle(test);
      if (rating > 0.75 && rating < 2) {
        this.board = test.map((el) => (el === null ? null : el + 1));
        return;
      }
    }
  }

  getHard() {
    while (true) {
      let test = this.getPuzzle();
      let rating = this.getRating(test);
      this.solvedPuzzle = sudoku.solvepuzzle(test);
      if (rating > 2.5) {
        this.board = test.map((el) => (el === null ? null : el + 1));
        return;
      }
    }
  }
  setBoard() {
    switch (this.difficulty) {
      default:
      case "easy":
        this.getEasy();
        break;

      case "medium":
        this.getMedium();
        break;

      case "hard":
        this.getHard();
        break;
    }

    return this.board;
  }

  /*  parsePuzzle() {
    this.puzzleString = this.board
      .map((cell) => (isNull(cell) ? 0 : cell))
      .join("");
  } */

  solvePuzzle() {
    console.log(this.board);
    //  this.solvedPuzzle = sudoku.solvepuzzle(this.board);

    return this.solvedPuzzle;
  }

  transformPuzzle() {
    const board2D = Array(9).fill(null);

    for (let row = 0; row < 9; row++) {
      board2D[row] = [];
      for (let i = row * 9; i < (row + 1) * 9; i++) {
        board2D[row].push(this.board[i]);
      }
    }

    console.log(board2D);
    return board2D;
  }
}

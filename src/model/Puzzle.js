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
      this.solvedPuzzle = sudoku
        .solvepuzzle(test)
        .map((el) => (el === null ? null : el + 1));
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
      this.solvedPuzzle = sudoku
        .solvepuzzle(test)
        .map((el) => (el === null ? null : el + 1));
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

    return this.transformPuzzle(this.board);
  }

  solvedBoard() {
    return this.transformPuzzle(this.solvedPuzzle, true);
  }

  transformPuzzle(puzzleArr, isSolution = false) {
    const board2D = Array(9).fill(null);

    for (let row = 0; row < 9; row++) {
      board2D[row] = [];
      for (let i = row * 9; i < (row + 1) * 9; i++) {
        puzzleArr[i] === null
          ? board2D[row].push(
              isSolution
                ? puzzleArr[i]
                : { values: [puzzleArr[i]], isMutable: true }
            )
          : board2D[row].push(
              isSolution
                ? puzzleArr[i]
                : { values: [puzzleArr[i]], isMutable: false }
            );
      }
    }

    return board2D;
  }
}

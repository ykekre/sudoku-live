import useLocalStorageState from "./useLocalStorageState";

export default (initialValue) => {
  const [puzzleState, setPuzzleState] = useLocalStorageState(
    "sudoku",
    initialValue
  );

  return {
    puzzleState,
    setPuzzleState,
  };
};

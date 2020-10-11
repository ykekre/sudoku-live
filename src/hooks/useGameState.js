import useLocalStorageState from "./useLocalStorageState";

export default (initialValue) => {
  const [gameState, setGameState] = useLocalStorageState("game", initialValue);

  return {
    gameState,
    setGameState,
  };
};

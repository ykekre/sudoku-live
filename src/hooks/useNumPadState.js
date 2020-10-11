import useLocalStorageState from "./useLocalStorageState";

export default (initialValue) => {
  const [numpadState, setNumpadState] = useLocalStorageState(
    "numpad",
    initialValue
  );

  return {
    numpadState,
    setNumpadState,
  };
};

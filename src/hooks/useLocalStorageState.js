import { useEffect, useState } from "react";
// import reducer from "../reducers/todos.reducer.js";

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key)) || defaultValue;
    } catch (e) {
      val = defaultValue;
    }

    return val;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;

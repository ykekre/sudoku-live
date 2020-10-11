import React, { createContext } from "react";

import useNumPadState from "../hooks/useNumPadState";
export const NumpadContext = createContext();

export const NumpadProvider = (props) => {
  const { numpadState, setNumpadState } = useNumPadState({});

  return (
    <NumpadContext.Provider value={{ numpadState, setNumpadState }}>
      {props.children}
    </NumpadContext.Provider>
  );
};

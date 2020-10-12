import React from "react";

import Game from "./Game";

import { GameProvider } from "./contexts/game.context";
import { PuzzleProvider } from "./contexts/puzzle.context";
import { NumpadProvider } from "./contexts/numpad.context";
function App() {
  return (
    <div className="App">
      <GameProvider>
        <PuzzleProvider>
          <NumpadProvider>
            {" "}
            <Game />
          </NumpadProvider>
        </PuzzleProvider>
      </GameProvider>
    </div>
  );
}

export default App;

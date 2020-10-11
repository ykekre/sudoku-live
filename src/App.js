import React from "react";

import Game from "./Game";

import { GameProvider } from "./contexts/game.context";
import { PuzzleProvider } from "./contexts/puzzle.context";
function App() {
  return (
    <div className="App">
      <GameProvider>
        <PuzzleProvider>
          {" "}
          <Game />
        </PuzzleProvider>
      </GameProvider>
    </div>
  );
}

export default App;

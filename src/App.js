import React from "react";

import Game from "./Game";

import { GameProvider } from "./contexts/game.context";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;

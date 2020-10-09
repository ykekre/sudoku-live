import React from "react";
import Board from "./components/Board.js";
import Numpad from "./components/Numpad.js";

import "./styles/layout/_layout.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header></header>
        <section>
          <Board />
        </section>
        <div className="side-bar"></div>
        <div className="num-pad-section">
          <Numpad />
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;

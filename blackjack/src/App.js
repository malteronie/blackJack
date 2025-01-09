import React from "react";
import Game from "./Game.jsx";
import "./App.css";

const App = () => {
  return (
    <header className="App-header">
      <div className="App">
        <h1>Blackjack</h1>
        <Game />
      </div>
    </header>
  );
};

export default App;
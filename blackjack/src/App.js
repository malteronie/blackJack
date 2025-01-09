import React from "react";
import Game from "./Game.jsx";
import "./App.css";

const App = () => {
  return (
    <header className="App-header" style={{"font-family": "Apple Chancery, cursive" }}>
      <div className="App">
        <h1 style={{"fontSize":"80px" }}>Blackjack</h1>
        <Game />
      </div>
    </header>
  );
};

export default App;
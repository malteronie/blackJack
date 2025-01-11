import React from "react";
import Game from "./Game.jsx";
import "./App.css";

const App = () => {
  return (
    <header className="App-header" style={{"fontFamily": "Apple Chancery, cursive" }}>
      <div className="App">
        <h1 style={{"fontSize":"88px", "marginTop":"0px" }}>BlackJack</h1>
        <Game />
      </div>
    </header>
  );
};

export default App;
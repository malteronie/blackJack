import React from "react";
import Navbar from "./Component/Navbar/Navbar.jsx";
import "./App.css";
import Router from "./Component/Routes/Routes.jsx";
const App = () => {

  return (
    <header className="App-header" style={{"fontFamily": "Apple Chancery, cursive" }}>
      <h1 className="blackjack"> BlackJack</h1>
        <Navbar/>
      <div className="App">
        <Router />
      </div>
    </header>
  );
};

export default App;
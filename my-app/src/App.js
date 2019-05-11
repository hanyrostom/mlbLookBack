import React from "react";
import mlbLogo from "./assets/mlbLogo.png";
import "./assets/App.css";


function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={mlbLogo} className="App-logo" alt="logo" />
        <h1>MLB</h1>
      </header>
    </div>
  );
}

export default App;

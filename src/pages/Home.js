import React from "react";
import chess from '../images/chessgif.gif'

function Home(props) {
  return (
    <div className="text-container">
        <h2>Welcome to the Game of Chess</h2>
        <h2>-Harshit Tibrewal</h2>
        <img src={chess} onClick={() => window.location.replace("/board")} alt=""/>
    </div>
  );
}

export default Home;

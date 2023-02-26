import React from 'react'
import './GameOver.css'

function GameOver(props) {
  return (
      <div className='container1'>
        <div className='loader'>
          <h2>GameOver! It was a {props.gameOver1}</h2>
        </div>
          <button type="" onClick={() => {props.setGameOver1([false, ""])}}>Return to the Game</button>
        <br/>
      </div>
  )
}
export default GameOver

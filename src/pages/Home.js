import React from 'react'

function Home(props) {

  return (
    <div className='container'>
        <h2 className='text-center'>Welcome to the Game of Chess<br/><div className='text-center'>Harshit Tibrewal</div></h2>
          <p>Chess is a two-player strategy board game played on a square checkered gameboard. Each player begins with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The goal of the game is to checkmate your opponent's king, which means the king is in a position to be captured (in check) and there is no way to move the king out of capture (mate).</p>

          <p>The game is played by moving pieces on the board according to specific rules, with the objective of putting the opponent's king in a position of checkmate. The moves of the pieces are as follows:</p>

          <ul>
            <li>King: one square in any direction</li>
            <li>Queen: in any direction along a rank, file, or diagonal</li>
            <li>Rook: along a rank or file</li>
            <li>Bishop: along a diagonal</li>
            <li>Knight: in an L-shape (two squares in one direction, then one square perpendicular to it)</li>
            <li>Pawn: forward one square, but capturing diagonally</li>
          </ul>

          <p>Chess has a rich history, with the earliest origins of the game being traced back to northern India or eastern Iran over a thousand years ago. The game was later adopted by the Islamic world and eventually made its way to Europe, where it has been played for centuries. Today, chess is one of the most popular games in the world and is enjoyed by millions of people of all ages and backgrounds.</p>
    </div>
  )
}

export default Home

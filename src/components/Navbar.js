import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <Link className='home' to="/"> Home </Link>
      <span className='text-white' onClick={() => window.location.replace("/board")}>New Game</span>
      <Link to='/board'> Board </Link>
    </div>
)
}

export default Navbar

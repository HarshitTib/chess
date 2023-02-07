import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <Link className='home' to="/"> Home </Link>
      <Link to='/board'> Board </Link>
    </div>
)
}

export default Navbar

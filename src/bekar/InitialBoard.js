import React from 'react'
import Pieces from '../components/Pieces'

function InitialBoard(props) {
  return (
    <div>
        {(props.row === 7) && <img src={Pieces.black.pawn1.img} alt="black-pawn" />}
        {(props.row === 2) && <img src={Pieces.white.pawn1.img} alt = "white-pawn" />}
        {(props.row === 8 && (props.col === 'a' || props.col === 'h')) && <img src={Pieces.black.rook1.img} alt = "black-rook" />}
        {(props.row === 1 && (props.col === 'a' || props.col === 'h')) && <img src={Pieces.white.rook1.img} alt = "white-rook" />}
        {(props.row === 8 && (props.col === 'b' || props.col === 'g')) && <img src={Pieces.black.knight1.img} alt = "black-knight" />}
        {(props.row === 1 && (props.col === 'b' || props.col === 'g')) && <img src={Pieces.white.knight1.img} alt = "white-knight" />}
        {(props.row === 8 && (props.col === 'c' || props.col === 'f')) && <img src={Pieces.black.bishop1.img} alt = "black-bishop" />}
        {(props.row === 1 && (props.col === 'c' || props.col === 'f')) && <img src={Pieces.white.bishop1.img} alt = "white-bishop" />}
        {(props.row === 8 && props.col === 'd') && <img src={Pieces.black.queen.img} alt = "black-queen"/>}
        {(props.row === 1 && props.col === 'd') && <img src={Pieces.white.queen.img} alt = "white-queen"/>}
        {(props.row === 8 && props.col === 'e') && <img src={Pieces.black.king.img} alt = "black-king"/>}
        {(props.row === 1 && props.col === 'e') && <img src={Pieces.white.king.img} alt = "white-king"/>}
    </div>
  )
}

export default InitialBoard

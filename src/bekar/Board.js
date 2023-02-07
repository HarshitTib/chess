import React, { useState } from 'react'
import './Board.css'
import Pieces from '../components/Pieces'

var matrix_row = ['8', '7', '6', '5', '4', '3', '2', '1']
var matrix_col = ['a','b','c','d','e','f','g','h']


function Board() {
  const[click, setClick] = useState(0)
  const[activePiece, setActivePiece] = React.useState("")
  var matrix = new Array(8);
  for (var i = 0; i < matrix.length; i++) 
  {
    matrix[i] = new Array(8);
  }
  let newMatrix = matrix

  function Image(i,j) {
    let x 
    let pieces = Object.entries(Pieces)
    pieces.map((key) => {
      if(matrix_row[i] == key[1]["position_x"] && matrix_col[j] == key[1]["position_y"])
      {
        x = [key, key[1]["img"]]
      }
    })
    return x
  }

  function Toggle(id) {  
    // console.log(id)
    if(click == 0)
    {
      let x = id.target.getAttribute("chess_piece")
      console.log(x)
      setActivePiece("black_bishop1")
      console.log(Pieces)
      console.log(activePiece)
      setClick(1)
      console.log(click)
    }
    else
    {

      Pieces[activePiece][1]["x_position"] = "4"
      Pieces[activePiece][1]["y_position"] = "d"
      setClick(0)

    }
    console.log(click)
    // console.log(id.target.getAttribute("position"))
  }
  
    for(var i=0;i<newMatrix.length;i++)
    {
      for(var j=0;j<newMatrix.length;j++)
      {
        var temp = Image(i,j)
        // console.log(temp)
        var temp1 = temp ? temp[0][0] : null 
        var temp2 = temp ? temp[1] : null 
        // console.log(temp1)  
        if((i+j)%2==0)
        {
          newMatrix[i][j] = <div className="color-blue matrix-design" chess_piece = {temp1}  key = {[matrix_row[i], matrix_col[j]]} position = {[matrix_row[i],matrix_col[j]]} 
          onClick = {(event) => {Toggle(event)}}
          ><img src={temp2} chess_piece = {temp1} position = {[matrix_row[i],matrix_col[j]]}  alt=""/></div>
        }
        else
        {
          newMatrix[i][j] = <div className="color-white matrix-design" chess_piece = {temp1}  key = {[matrix_row[i], matrix_col[j]]} position = {[matrix_row[i],matrix_col[j]]} 
          onClick = {(event) => {Toggle(event)}}
          ><img src={temp2} chess_piece = {temp1} position = {[matrix_row[i],matrix_col[j]]}  alt=""/></div>
        } 
      }
    }
  return (
  <div className='matrix-style'>
    {newMatrix}
    {console.log(activePiece)}
  </div>
  )
}

export default Board
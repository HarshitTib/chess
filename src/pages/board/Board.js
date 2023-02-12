import React, { useState } from 'react'
import Pieces from '../../components/Pieces'
import './Board.css'
import ChessMove from './ChessMove'
import KingCheck from './KingCheck'
import Checkmate from './Checkmate'
import PawnPromotion from './PawnPromotion'

var matrix_row = ['8', '7', '6', '5', '4', '3', '2', '1']
var matrix_col = ['a','b','c','d','e','f','g','h']
var matrix
var activePiece
let x1,x2,y1,y2 // to store the old value of x and y while making a move

function MakeAMove(currentPiece, activePiece, x, y)
{
  if(!currentPiece) // If it is an empty block
  {
    x1 = Pieces[activePiece]["position_x"] // prev value of the activePiece in x
    y1 = Pieces[activePiece]["position_y"] // prev value of the activePiece in y
    Pieces[activePiece]["position_x"] = x
    Pieces[activePiece]["position_y"] = y
    return true    
  }
  else if((Pieces[activePiece]["color"] !== Pieces[currentPiece]["color"])) //If it contains the alternate piece
  {
    x1 = Pieces[activePiece]["position_x"] // prev value of the activePiece in x
    y1 = Pieces[activePiece]["position_y"] // prev value of the activePiece in y
    x2 = Pieces[currentPiece]["position_x"] // prev value of the currentPiece in x
    y2 = Pieces[currentPiece]["position_y"] // prev value of the currentPiece in y
    Pieces[activePiece]["position_x"] = x
    Pieces[activePiece]["position_y"] = y
    Pieces[currentPiece]["position_x"] = "-1"
    Pieces[currentPiece]["position_y"] = "-1"
    return true
  }
  else 
  {
    return false
  }
}

function RevertBack(currentPiece, activePiece)
{
  if(!currentPiece)
  {
    Pieces[activePiece]["position_x"] = x1
    Pieces[activePiece]["position_y"] = y1
  }
  else if((Pieces[activePiece]["color"] !== Pieces[currentPiece]["color"])) 
  {
      Pieces[activePiece]["position_x"] = x1
      Pieces[activePiece]["position_y"] = y1
      Pieces[currentPiece]["position_x"] = x2
      Pieces[currentPiece]["position_y"] = y2
  }
}

function Images(x,y) // return an image at a particular location
{
    let piece = Object.entries(Pieces)
    let temp = null
    piece.map(key =>
    {
        if(key[1]["position_x"] === x && key[1]["position_y"] === y)
        {
            temp = key[0]  // returning the images at a particular position
        }     
        return []
    })
    return temp
}

function Board() {

    const [check, setCheck] = useState(false)
    const [render, setRender] = useState(1)
    const [click, setClick] = useState(0)
    const [pawnPromoted, setPawnPromoted] = useState([])
    
    const [player1, setPlayer1] = useState(true)
    

    function Toggle (box, dest_x, dest_y) {
        let currentPiece = box.getAttribute("chess-piece")
        let current_color = player1 ? "white" : "black"
        if((!currentPiece && click === 0))
        {
            return
        }
        if((currentPiece))
        {
            if((click === 0) && (current_color === Pieces[currentPiece]["color"]))
            {
                activePiece = currentPiece
                setClick(1)
                return
            }
            else if((click === 1) && (Pieces[activePiece]["color"] === Pieces[currentPiece]["color"]))
            {
                setClick(0)
            }
        }
        if((click === 1) && ChessMove(activePiece, dest_x, dest_y, check)) // If it is a valid move
        {
            MakeAMove(currentPiece, activePiece, dest_x, dest_y)
            let notCurrCol = current_color === "white" ? "black" : "white"
            let temp_king = notCurrCol + "_king"
            let temp = KingCheck(temp_king) 
            let current_king = temp[0] ? temp[0] : temp_king 
            let king_is_checked = temp[2]
            let king_color = temp[0] ? Pieces[current_king]["color"] : ""
            if(king_is_checked && Pieces[activePiece]["color"] === king_color) // When you deliberately want to apply check to your king
            {
                RevertBack(currentPiece, activePiece)
                alert("Invalid move")
                setClick(0)
                setRender(render+1)
            }
            else {
                if(check) // Once it is checked, check for the next step
                {
                    if(king_is_checked) // If the next move give rise to the check, revert back
                    {
                        RevertBack(currentPiece, activePiece)
                    }
                    else // check got eliminated
                    {
                        if(activePiece.includes("pawn") && (Pieces[activePiece]["position_x"] === '1' || Pieces[activePiece]["position_x"] === '8'))
                        {
                            setPawnPromoted([activePiece, true])
                        }
                        setClick(0)
                        setCheck(false)
                        setRender(render+1)
                        setPlayer1(!player1)
                    }
                }
                else // When the king is not checked
                {
                    if(king_is_checked) // And the next move make the king to check
                    {
                        setCheck(true)
                        if (Checkmate(current_king) === 1)
                        {
                            alert("It is a checkmate")
                            Pieces[current_king]["checkmate"] = true
                            window.location.replace("/GameOver")
                        }
                    }
                    else 
                    {
                        if (Checkmate(current_king) === 1)
                        {
                            alert("It is a stalemate")
                            window.location.replace("/GameOver")
                        }
                    }
                    // console.log(activePiece)
                    if(activePiece.includes("pawn") && (Pieces[activePiece]["position_x"] === '1' || Pieces[activePiece]["position_x"] === '8'))
                    {
                        setPawnPromoted([activePiece, true])
                    }
                    setClick(0)
                    setPlayer1(!player1)
                    setRender(render+1)
                }
            }
        }
        else
        {
            setClick(0)
        }
    }

    function InsertIntoMatrix()
    {
        matrix = new Array(9)
        let n = 9
        for(let i=0; i<matrix.length; i++)
        {
            matrix[i] = new Array(9)
        }
        if(render)
        {
            for(let i=0; i<n; i++)
            {
                for(let j=0; j<n; j++)
                {
                    if(i === 8 || j === 0)
                    {
                        if(i===8)
                        {
                            matrix[i][j] =<div className='box-design color-grey bottom-edge-design' key = {[i,j]}>{matrix_col[j-1]}</div>
                            matrix[i][0] = <div className='box-design color-grey left-edge-design bottom-edge-design' key = {[i,0]}>0</div>
                        }
                        else
                        { 
                            matrix[i][j] =<div className='box-design color-grey left-edge-design' key = {[i,j]}>{matrix_row[i]}</div>
                        }
                    }
                    else
                    {
                        let temp = check ?  KingCheck() : ""
                        let current_king = temp[0]
                        let check_giver = temp[1]
                        let x = matrix_row[i]
                        let y = matrix_col[j-1]
                        var image = Images(x,y)
                        var image_img = image ? Pieces[image]["img"] : null
                        if((i+j)%2 === 1)
                        {
                            matrix[i][j] = <div className='box-design color-white' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                            onClick={(event) => Toggle(event.target,x,y)}
                            style = {{
                                backgroundColor: (current_king === image || (check_giver && check_giver.includes(image))) ? " rgb(212, 8, 8)" : "" 
                            }}>
                            <img chess-piece={image} src={image_img} alt={image}/></div>
                        }   
                        else
                        {
                            matrix[i][j] = <div className='box-design color-blue' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                            onClick={(event) => Toggle(event.target,x,y)}
                            style = {{
                                backgroundColor: (current_king === image || (check_giver && check_giver.includes(image))) ? " rgb(212, 8, 8)" : "" 
                            }}>
                            <img chess-piece={image} src={image_img} alt={image}/></div>
                        }
                    }
                }
            }
        }
    }


    InsertIntoMatrix()

    return (
        <>
        {!pawnPromoted[1] &&
        <div className='matrix-design'>
            {matrix}
        </div>
        }
        {!pawnPromoted[1] &&   
        <div className='players'>
            {player1 && <div>Player 1(white) move</div>} 
            {!player1 && <div>Player 2(black) move</div>} 
        </div>
        }
        {pawnPromoted[1] &&
        <div className='text-white pawn-promoted'>
            {/* ajdjada */}
            <button type="" onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"queen")}}>Queen</button>
            <button type="" onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"bishop")}}>Bishop</button>
            <button type="" onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"knight")}}>Knight</button>
            <button type="" onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"rook")}}>Rook</button>
        </div>}
        </>
    )
}

export default Board

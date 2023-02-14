import React, { useState } from 'react'
import Pieces from '../../components/Pieces'
import './Board.css'
import ChessMove from './ChessMove'
import KingCheck from './KingCheck'
import Checkmate from './Checkmate'
import PawnPromotion from './PawnPromotion'
import black_rook from "../../images/black-rook.png"
import black_knight from "../../images/black-knight.png"
import black_bishop from "../../images/black-bishop.png"
import black_queen from "../../images/black-queen.png"
import white_rook from "../../images/white-rook.png"
import white_knight from "../../images/white-knight.png"
import white_bishop from "../../images/white-bishop.png"
import white_queen from "../../images/white-queen.png"


var matrix_row = ['8', '7', '6', '5', '4', '3', '2', '1']
var matrix_col = ['1', '2', '3', '4', '5', '6', '7', '8']
var matrix_col1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
var matrix
var activePiece
let x1,x2,y1,y2 // to store the old value of x and y while making a move

export function MakeAMove(currentPiece, activePiece, x, y)
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

export function RevertBack(currentPiece, activePiece)
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

    function Toggle (box, dest_x, dest_y) 
    {
        let currentPiece = box.getAttribute("chess-piece")
        let current_color = player1 ? "white" : "black"
        let not_current_color = player1 ? "black" : "white"
        if(click === 0)
        {
            if(currentPiece && Pieces[currentPiece]["color"] === current_color)
            {
                activePiece = currentPiece;
                setClick(1);
            }
        }
        else
        {
            if((currentPiece && Pieces[currentPiece]["color"] === Pieces[activePiece]["color"]) || (currentPiece && Pieces[currentPiece]["color"] !== Pieces[activePiece]["color"] && !ChessMove(activePiece, dest_x, dest_y, check)) || !ChessMove(activePiece, dest_x, dest_y, check))
            {
                alert("Invalid move")
                setClick(0);
                return;
            }
            else
            {
                MakeAMove(currentPiece, activePiece, dest_x, dest_y)
                let current_king = current_color+ "_king"
                let opponent_king = not_current_color + "_king"
                if(current_king === KingCheck(current_king)[0] && KingCheck(current_king)[2])
                {
                    alert("Invalid move")
                    RevertBack(currentPiece, activePiece)
                    setClick(0)
                    return
                }
                if(check)
                {
                    setCheck(!check)
                }
                let ar = [Pieces["white_rook1"]["moved"], Pieces["white_rook2"]["moved"], Pieces["white_king"]["moved"], Pieces["black_rook1"]["moved"], Pieces["black_rook2"]["moved"], Pieces["black_king"]["moved"]]
                if(KingCheck(opponent_king)[2])
                {
                    setCheck(!check)
                    if(Checkmate(opponent_king) === 1)
                    {
                        Pieces["white_rook1"]["moved"] = ar[0]
                        Pieces["white_rook2"]["moved"] = ar[1]
                        Pieces["white_king"]["moved"] = ar[2]
                        Pieces["black_rook1"]["moved"] = ar[3]
                        Pieces["black_rook2"]["moved"] = ar[4]
                        Pieces["black_king"]["moved"] = ar[5]
                        alert("It is a checkmate")
                        Pieces[current_king]["checkmate"] = true
                        window.location.replace("/GameOver")
                    }
                    setClick(0)
                    setPlayer1(!player1)
                    setRender(render+1)
                    return
                }
                else if(Checkmate(opponent_king) === 1)
                {
                    Pieces["white_rook1"]["moved"] = ar[0]
                    Pieces["white_rook2"]["moved"] = ar[1]
                    Pieces["white_king"]["moved"] = ar[2]
                    Pieces["black_rook1"]["moved"] = ar[3]
                    Pieces["black_rook2"]["moved"] = ar[4]
                    Pieces["black_king"]["moved"] = ar[5]
                    alert("It is a stalemate")
                    window.location.replace("/GameOver")
                }
                if(activePiece.includes("pawn") && (Pieces[activePiece]["position_x"] === '1' || Pieces[activePiece]["position_x"] === '8'))
                {
                    setPawnPromoted([activePiece, true])
                }
                setClick(0) 
                setPlayer1(!player1)
            }
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
                            matrix[i][j] =<div className='box-design color-grey bottom-edge-design' key = {[i,j]}>{matrix_col1[j-1]}</div>
                            matrix[i][0] = <div className='box-design color-grey left-edge-design bottom-edge-design' key = {[i,0]}>0</div>
                        }
                        else
                        { 
                            matrix[i][j] =<div className='box-design color-grey left-edge-design' key = {[i,j]}>{matrix_row[i]}</div>
                        }
                    }
                    else
                    {
                        let current_king = player1 ? "white_king" : "black_king"
                        let temp = check ?  KingCheck(current_king) : ""
                        current_king = temp[0]
                        let check_giver = temp[1]
                        let x = matrix_row[i]
                        let y = matrix_col[j-1]
                        var image = Images(x,y)
                        var image_img = image ? Pieces[image]["img"] : null
                        if((i+j)%2 === 1)
                        {
                            matrix[i][j] = <div className='box-design color-white' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                            onClick={(event) => Toggle(event.target, x, y)}
                            style = {{
                                backgroundColor: (current_king === image || (check_giver && check_giver.includes(image))) ? " rgb(212, 8, 8)" : "" 
                            }}>
                            <img chess-piece={image} src={image_img} alt={image}/></div>
                        }   
                        else
                        {
                            matrix[i][j] = <div className='box-design color-blue' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                            onClick={(event) => Toggle(event.target, x, y)}
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
            <button 
            style={{backgroundImage: !player1 ? `url(${white_queen})`:  `url(${black_queen})` , backgroundRepeat:"no-repeat", backgroundPosition: "50%"}}
            onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"queen")}}></button>
            <button 
            style={{backgroundImage: !player1 ? `url(${white_bishop})`:  `url(${black_bishop})` , backgroundRepeat:"no-repeat", backgroundPosition: "50%"}}
            onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"bishop")}}></button>
            <button 
            style={{backgroundImage: !player1 ? `url(${white_knight})`:  `url(${black_knight})` , backgroundRepeat:"no-repeat", backgroundPosition: "50%"}}
            onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"knight")}}></button>
            <button
            style={{backgroundImage: !player1 ? `url(${white_rook})`:  `url(${black_rook})` , backgroundRepeat:"no-repeat", backgroundPosition: "50%"}}
            onClick={() => {PawnPromotion(pawnPromoted,setPawnPromoted,setCheck,"rook")}}></button>
        </div>}
        </>
    )
}

export default Board


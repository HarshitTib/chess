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

function Board() {

    const [check, setCheck] = useState(false)
    const [render, setRender] = useState(1)
    const [click, setClick] = useState(0)
    const [pawnPromoted, setPawnPromoted] = useState([])
    
    const [player1, setPlayer1] = useState(true)
    function Images(x,y)
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

    function Toggle (box, x, y) {
        let currentPiece = box.getAttribute("chess-piece")
        if((!currentPiece && click === 0))
        {
            return
        }
        let current_color = player1 ? "white" : "black"
        if((currentPiece) && (click === 0))
        {
            if((current_color === Pieces[currentPiece]["color"]))
            {
                activePiece = currentPiece
                // console.log(activePiece)
                setClick(1)
            }
        }
        else if(currentPiece && (Pieces[activePiece]["color"] === Pieces[currentPiece]["color"]))
        {
            setClick(0)
        }
        else if(ChessMove(activePiece,x,y)) // If it is a valid move
        {
            // console.log(currentPiece, activePiece)
            let x1,y1,x2,y2
            if(!currentPiece) // If it is an empty block
            {
                x1 = Pieces[activePiece]["position_x"] // prev value of the activePiece in x
                y1 = Pieces[activePiece]["position_y"] // prev value of the activePiece in y
                Pieces[activePiece]["position_x"] = x
                Pieces[activePiece]["position_y"] = y
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
            }
            let notCurrCol = current_color === "white" ? "black" : "white"
            let temp = KingCheck(notCurrCol)
            let temp_king = notCurrCol + "_king"
            // console.log("Curr color king : ", temp_king)
            let current_king = temp[0] ? temp[0] : temp_king
            let king_is_checked = temp[2]
            let king_color = current_king ? Pieces[current_king]["color"] : ""
            if(king_is_checked && Pieces[activePiece]["color"] === king_color) // When you deliberately want to apply check to your king
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
                alert("Invalid move")
                setClick(0)
                setRender(render+1)
            }
            else {
                if(check) // Once it is checked, check for the next step
                {
                    if(king_is_checked) // If the next move give rise to the check, revert back
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
                    else // check got eliminated
                    {
                        // console.log(activePiece)
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
                            console.log("Checkmate")
                    }
                    else 
                    {
                            if (Checkmate(current_king) === 1)
                                console.log("Stalemate")
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
        matrix = new Array(8)
        let n = 8
        for(let i=0; i<matrix.length; i++)
        {
            matrix[i] = new Array(8)
        }
        if(render)
        {
            for(let i=0; i<n; i++)
            {
                for(let j=0; j<n; j++)
                {
                    let temp = check ?  KingCheck() : ""
                    let current_king = temp[0]
                    let check_giver = temp[1]
                    let x = matrix_row[i]
                    let y = matrix_col[j]
                    var image = Images(x,y)
                    var image_img = image ? Pieces[image]["img"] : null
                    if((i+j)%2 === 0)
                    {
                        matrix[i][j] = <div className='box-design color-white' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                        onClick={(event) => Toggle(event.target,x,y)}
                        style = {{
                            backgroundColor: (current_king === image || (check_giver && check_giver.includes(image))) ? "rgba(193, 0, 0, 0.724)" : "" 
                        }}>
                        <img chess-piece={image} src={image_img} alt={image}/></div>
                    }   
                    else
                    {
                        matrix[i][j] = <div className='box-design color-blue' tabIndex={[i,j]} key = {[i,j]} chess-piece={image} 
                        onClick={(event) => Toggle(event.target,x,y)}
                        style = {{
                            backgroundColor: (current_king === image || (check_giver && check_giver.includes(image))) ? "rgba(193, 0, 0, 0.724)" : "" 
                        }}>
                        <img chess-piece={image} src={image_img} alt={image}/></div>
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
        <div className='text-white'>
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

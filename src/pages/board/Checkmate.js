import Pieces from '../../components/Pieces'
import ChessMove, { CheckPiece } from './ChessMove'
import KingCheck from './KingCheck'
let x1,y1,x2,y2
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
    }else {
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


function ValidMove(key,destination_x,destination_y)
{
  let king_is_checked = true
  let source_x = parseInt(key[1]["position_x"])
  let source_y = key[1]["position_y"].charCodeAt(0)
  if(source_x !== -1 && source_y !== -1)
  {
    if(ChessMove(key[0], String(destination_x), String.fromCharCode(destination_y)))
    {
      let currentPiece = CheckPiece(destination_x, destination_y)
      let temp = MakeAMove(currentPiece[0], key[0], String(destination_x), String.fromCharCode(destination_y))
      if (temp) {
        king_is_checked = KingCheck()[2]
        RevertBack(currentPiece[0], key[0])
        return king_is_checked
      }
      return true
    }
  }
  return king_is_checked
}

function Checkmate(current_king) {
  let chess_pieces = Object.entries(Pieces)
  let cond = true
  let flag = 0
  chess_pieces.map(key => {
    if(key[1]["color"] === Pieces[current_king]["color"])
    { 
      // console.log(key[0])
      for(let i=1; i<=8; i++)
      {
        for(let j=97; j<=104; j++)
        {
          cond = ValidMove(key,i,j)
          if(cond === false || flag === 1)
          {
            flag = 1
            break;
          }
        }
        if(flag === 1)
        {
          break;
        }
      }
    }
    return[]
  })
  // if(flag === 0)
  // {
  //   alert("It is a checkmate")
  // }
  return flag === 0 ? 1 : 0
}

export default Checkmate

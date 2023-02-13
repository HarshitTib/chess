import Pieces from '../../components/Pieces'
import ChessMove, { CheckPiece } from './ChessMove'
import KingCheck from './KingCheck'
import { MakeAMove, RevertBack } from './Board'


function ValidMove(key, destination_x, destination_y, current_king)
{
  let king_is_checked = true
  let source_x = parseInt(key[1]["position_x"])
  let source_y = parseInt(key[1]["position_y"])
  if(source_x !== -1 && source_y !== -1)
  {
    if(ChessMove(key[0], String(destination_x), String(destination_y)))
    {
      let currentPiece = CheckPiece(destination_x, destination_y)
      let temp = MakeAMove(currentPiece[0], key[0], String(destination_x), String(destination_y))
      if (temp) 
      {
        king_is_checked = KingCheck(current_king)[2]
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
  let flag = 1
  chess_pieces.map(key => {
    if(key[1]["color"] === Pieces[current_king]["color"])
    { 
      for(let i=1; i<=8; i++)
      {
        for(let j=1; j<=8; j++)
        {
          cond = ValidMove(key, i, j, current_king)
          if(cond === false || flag === 0)
          {
            flag = 0
            break;
          }
        }
        if(flag === 0)
        {
          break;
        }
      }
    }
    return[]
  })
  return flag
}

export default Checkmate

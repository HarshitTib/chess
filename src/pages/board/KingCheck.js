import { PawnMove, RookMove, BishopMove, KnightMove, KingMove } from './ChessMove'
import Pieces from '../../components/Pieces'

function KingCheck()
{  
    let con = ["",[],false  ] // current King, Chess Piece who gives the check, check
    var king = []
    var piece = Object.entries(Pieces)
    piece.map((key) =>
    {
        if(key[0].includes("king"))
        {
            king.push(key)
        }
        return []
    })
    // console.log(king.length)
    for(let i=0; i<king.length; i++)
    {
        let currentKing = king[i]
        piece.map((key) =>
        {
            let king_color = currentKing[1]["color"]
            let piece_color = key[1]["color"]
            if(king_color !== piece_color)
            {
                let int_xd = parseInt(currentKing[1]["position_x"]) // Destination x
                let int_yd = currentKing[1]["position_y"].charCodeAt(0) // Destination y
                let int_xs = parseInt(key[1]["position_x"]) // Source x
                let int_ys = key[1]["position_y"].charCodeAt(0)
                if(key[0].includes("pawn"))
                {
                    if(PawnMove(int_xd,int_xs,int_yd,int_ys,key[0],currentKing[0]))
                    {
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
                if(key[0].includes("rook"))
                {
                    if(RookMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
                if(key[0].includes("bishop"))
                {
                    if(BishopMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        // console.log(key[0], "gives check to ", currentKing[0])
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
                if(key[0].includes("knight"))
                {
                    if(KnightMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
                if(key[0].includes("queen"))
                {
                    if(RookMove(int_xd,int_xs,int_yd,int_ys) || BishopMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
                if(key[0].includes("king"))
                {
                    if(KingMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = currentKing[0]
                        con[1].push(key[0])
                        con[2] = true
                    }
                }
            }
            return []
        })
    }
    // console.log("KC returning ", con[2])
    return con
}

export default KingCheck

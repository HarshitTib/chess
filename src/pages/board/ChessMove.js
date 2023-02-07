import Pieces from '../../components/Pieces'

function PawnMove(int_xd, int_xs, int_yd, int_ys, activePiece, currentPiece)
{
    let con = false
    let diff_x = int_xd - int_xs
    let diff_y = Math.abs(int_ys - int_yd)
    if(Pieces[activePiece]["color"] === "white")
    {
        if(int_xs === 2 && (diff_x === 1 || diff_x === 2) && diff_y === 0 && (currentPiece === null ||(currentPiece !== null && Pieces[currentPiece]["color"] !== "black")))
        {
            con = true
        }
        else if(diff_x === 1 && diff_y === 0 && (currentPiece === null ||(currentPiece !== null && Pieces[currentPiece]["color"] !== "black")))
        {
            con = true
        }
        else if(diff_x === 1 && Math.abs(diff_y) === 1 &&(currentPiece !== null && Pieces[currentPiece]["color"] === "black"))
        {
            con = true
        }
    }
    else if(Pieces[activePiece]["color"] === "black")
    {
        if(int_xs === 7 && (diff_x === -1 || diff_x === -2)  && diff_y === 0 && (currentPiece === null ||(currentPiece !== null && Pieces[currentPiece]["color"] !== "white")))
        {
            con = true
        }
        else if(diff_x === -1 && diff_y === 0 && (currentPiece === null ||(currentPiece !== null && Pieces[currentPiece]["color"] !== "white")))
        {
            con = true
        }
        else if(diff_x === -1 && Math.abs(diff_y) === 1 &&(currentPiece !== null && Pieces[currentPiece]["color"] === "white"))
        {
            con = true
        }
    }
    return con
}

function RookMove(int_xd, int_xs, int_yd, int_ys)
{
    var con = [true]
    if(int_xs === int_xd)
    {
        let [min, max] = (int_yd > int_ys) ? [int_ys,int_yd] : [int_yd,int_ys]
        for(let i=min+1; i<max; i++)
        {
            let piece = Object.entries(Pieces)
            piece.map(key =>
            {
                if(key[1]["position_x"] === String(int_xs) && key[1]["position_y"] === String.fromCharCode(i))
                {
                    con[0] = false
                }     
                return []
            })
        }
    }
    else if(int_ys === int_yd)
    {
        let [min, max] = int_xd > int_xs ? [int_xs,int_xd] : [int_xd,int_xs]
        for(let i=min+1; i<max; i++)
        {
            let piece = Object.entries(Pieces)
            piece.map(key =>
            {
                if(key[1]["position_x"] === String(i) && key[1]["position_y"] === String.fromCharCode(int_ys))
                {
                    con[0] = false
                }    
                return [] 
            })
        }
    }
    else
    {
        con[0] = false
    }
    return con[0]
}

function BishopMove(int_xd, int_xs, int_yd, int_ys)
{
    var con = [true]
    let diff_x = Math.abs(int_xs - int_xd)
    let diff_y = Math.abs(int_ys - int_yd)
    if(diff_x === diff_y)
    {
        let piece = Object.entries(Pieces)
        for(let i=1; i<diff_x; i++)
        {
            piece.map(key =>
            {
                if((int_xd > int_xs) && (int_yd > int_ys))
                {
                    if(key[1]["position_x"] === String(int_xs+i) && key[1]["position_y"] === String.fromCharCode(int_ys+i))
                    {
                        con[0] = false
                    }     
                }
                else if((int_xd < int_xs) && (int_yd > int_ys))
                {
                    if(key[1]["position_x"] === String(int_xs-i) && key[1]["position_y"] === String.fromCharCode(int_ys+i))
                    {
                        con[0] = false
                    }     
                }
                else if((int_xd > int_xs) && (int_yd < int_ys))
                {
                    if(key[1]["position_x"] === String(int_xs+i) && key[1]["position_y"] === String.fromCharCode(int_ys-i))
                    {
                        con[0] = false
                    }     
                }
                else if((int_xd < int_xs) && (int_yd < int_ys))
                {
                    if(key[1]["position_x"] === String(int_xs-i) && key[1]["position_y"] === String.fromCharCode(int_ys-i))
                    {
                        con[0] = false
                    }     
                }
                return []
            })
        }
    }
    else
    {
        con[0] = false
    }
    return con[0]
}

function KnightMove(int_xd, int_xs, int_yd, int_ys)
{
    let con = true
    let diff_x = Math.abs(int_xs - int_xd)
    let diff_y = Math.abs(int_ys - int_yd)
    if((diff_x === 2 && diff_y === 1) || (diff_x === 1 && diff_y === 2))
    {
        con = true
    }
    else
    {
        con = false
    }
    return con
}

function KingMove(int_xd, int_xs, int_yd, int_ys)
{
    let con = false
    let diff_x = Math.abs(int_xs - int_xd)
    let diff_y = Math.abs(int_ys - int_yd)
    if((diff_x === 1 && diff_y === 0) || (diff_y === 1 && diff_x === 0) || (diff_x === 1 && diff_y === 1))
    {
        con = true
    }
    return con
}

export function KingCheck()
{  
    let con = ["",false]
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
                        con[0] = king_color
                        con[1] = true
                    }
                }
                else if(key[0].includes("rook"))
                {
                    if(RookMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = king_color
                        con[1] = true
                    }
                }
                else if(key[0].includes("bishop"))
                {
                    if(BishopMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = king_color
                        con[1] = true
                    }
                }
                else if(key[0].includes("knight"))
                {
                    if(KnightMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = king_color
                        con[1] = true
                    }
                }
                else if(key[0].includes("queen"))
                {
                    if(RookMove(int_xd,int_xs,int_yd,int_ys) || BishopMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = king_color
                        con[1] = true
                    }
                }
                else if(key[0].includes("king"))
                {
                    if(KingMove(int_xd,int_xs,int_yd,int_ys))
                    {
                        con[0] = king_color
                        con[1] = true
                    }
                }
            }
            return []
        })
    }
    return con
}


function ChessMove(activePiece,currentPiece,x,y) {

    var cond = false
    var int_xd1 = parseInt(x) // Destination x
    var int_yd1 = y.charCodeAt(0) // Destination y
    var int_xs1 = parseInt(Pieces[activePiece]["position_x"]) // Source x
    var int_ys1 = Pieces[activePiece]["position_y"].charCodeAt(0) // Source y    
    if(activePiece.includes("bishop"))
    {
        cond = BishopMove(int_xd1, int_xs1, int_yd1, int_ys1)
    }
    else if(activePiece.includes("knight"))
    {
        cond = KnightMove(int_xd1, int_xs1, int_yd1, int_ys1)
    }
    else if(activePiece.includes("rook"))
    {
        cond = RookMove(int_xd1, int_xs1, int_yd1, int_ys1)
    }
    else if (activePiece.includes("queen"))
    {
        cond = (RookMove(int_xd1, int_xs1, int_yd1, int_ys1) || BishopMove(int_xd1, int_xs1, int_yd1, int_ys1))
    }
    else if(activePiece.includes("pawn"))
    {
        cond = PawnMove(int_xd1, int_xs1, int_yd1, int_ys1, activePiece, currentPiece)
    }
    else if(activePiece.includes("king"))
    {
        cond = (KingMove(int_xd1, int_xs1, int_yd1, int_ys1))
    }
    return (
        cond
    )

}

export default ChessMove

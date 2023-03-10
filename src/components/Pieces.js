import black_pawn from "../images/black-pawn.png"
import black_rook from "../images/black-rook.png"
import black_knight from "../images/black-knight.png"
import black_bishop from "../images/black-bishop.png"
import black_queen from "../images/black-queen.png"
import black_king from "../images/black-king.png"
import white_pawn from "../images/white-pawn.png"
import white_rook from "../images/white-rook.png"
import white_knight from "../images/white-knight.png"
import white_bishop from "../images/white-bishop.png"
import white_queen from "../images/white-queen.png"
import white_king from "../images/white-king.png"

var Pieces =  {
        "black_pawn1":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "1",
            "img": black_pawn,
        },
        "black_pawn2":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "2",
            "img": black_pawn
        },
        "black_pawn3":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "3",
            "img": black_pawn
        },
        "black_pawn4":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "4",
            "img": black_pawn
        },
        "black_pawn5":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "5",
            "img": black_pawn
        },
        "black_pawn6":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "6",
            "img": black_pawn
        },
        "black_pawn7":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "7",
            "img": black_pawn
        },
        "black_pawn8":
        {
            "color": "black",
            "position_x": "7",
            "position_y": "8",
            "img": black_pawn
        },
        "black_rook1":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "1",
            "img": black_rook,
            "moved" : false
        },
        "black_rook2":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "8",
            "img": black_rook,
            "moved" : false
        },
        "black_knight1":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "2",
            "img": black_knight
        },
        "black_knight2":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "7",
            "img": black_knight
        },
        "black_bishop1":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "3",
            "img": black_bishop
        },
        "black_bishop2":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "6",
            "img": black_bishop
        },
        "black_queen1":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "4",
            "img": black_queen
        },
        "black_king":
        {
            "color": "black",
            "position_x": "8",
            "position_y": "5",
            "img": black_king,
            "moved" : false,
            "checkmate" : false
        },
        "white_pawn1":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "1",
            "img": white_pawn
        },
        "white_pawn2":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "2",
            "img": white_pawn
        },
        "white_pawn3":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "3",
            "img": white_pawn
        },
        "white_pawn4":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "4",
            "img": white_pawn
        },
        "white_pawn5":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "5",
            "img": white_pawn
        },
        "white_pawn6":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "6",
            "img": white_pawn
        },
        "white_pawn7":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "7",
            "img": white_pawn
        },
        "white_pawn8":
        {
            "color": "white",
            "position_x": "2",
            "position_y": "8",
            "img": white_pawn
        },
        "white_rook1":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "1",
            "img": white_rook,
            "moved" : false
        },
        "white_rook2":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "8",
            "img": white_rook,
            "moved" : false
        },
        "white_knight1":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "2",
            "img": white_knight
        },
        "white_knight2":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "7",
            "img": white_knight
        },
        "white_bishop1":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "3",
            "img": white_bishop
        },
        "white_bishop2":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "6",
            "img": white_bishop
        },
        "white_queen1":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "4",
            "img": white_queen
        },
        "white_king":
        {
            "color": "white",
            "position_x": "1",
            "position_y": "5",
            "img": white_king,
            "moved" : false,
            "checkmate" : false
        },
    }

export default Pieces
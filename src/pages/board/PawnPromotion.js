import Pieces from '../../components/Pieces'
import deepCopy from "lodash/cloneDeep"
import KingCheck from './KingCheck'
import Checkmate from './Checkmate'

var count = 32

function PawnPromotion(pawnPromoted, setPawnPromoted, setCheck, image_tag) {
    let image = pawnPromoted[0]
    let new_image
    let current_king
    let x = Pieces[image]["position_x"]
    let y = Pieces[image]["position_y"]
    if(image.includes("white"))
    {
        new_image = "white_"+image_tag
        current_king = "black_king"
    }
    else
    {
        new_image = "black_"+image_tag
        current_king = "white_king"
    }
    let temp = deepCopy(Pieces[new_image+'1'])
    temp["position_x"] = x;
    temp["position_y"] = y;
    Pieces[image]["position_x"] = "-1"
    Pieces[image]["position_y"] = "-1"
    Pieces[new_image+count++] = temp
    let check_condition = KingCheck()[2]
    setCheck(check_condition)
    if(Checkmate(current_king))
    {
        console.log("It is a Checkmate")
    }
    if(check_condition === false && Checkmate(current_king))
    {
        console.log("It is a Stalemate")
    }
    setPawnPromoted(["",false])
}

export default PawnPromotion

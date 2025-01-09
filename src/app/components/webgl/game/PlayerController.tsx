import { Player } from "../Player"
import Back from "../intro/Back"
import Weapon from "../intro/Weapon"
import Floor from "./Floor"
import MousePointer from "./MousePointer"

function PlayerController() {
    return (
        <>
            <Player/>
            <Weapon/>
            <Back/>
            <Floor/>
            <MousePointer/>
        </>
    )
}

export default PlayerController
import mapData from "@/app/utils/MapData"
import { Oirow } from "../npc/Oirow"
import Spot from "./Spot"

function Map() {
    return (
        <>
            <Oirow position={[mapData[0].position[0],mapData[0].position[1], mapData[0].position[2]]}/>
            <Spot position={[mapData[0].position[0],mapData[0].position[1], mapData[0].position[2]]}/>
        </>
    )
}

export default Map
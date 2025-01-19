import mapData from "@/app/utils/MapData"
import { Oirow } from "../npc/Oirow"
import Spot from "./Spot"
import TextWrapper from "../TextWrapper"

function Map() {
    return (
        <>
            <Oirow position={mapData[0].position}/>
            <Spot position={mapData[0].position}/>
            <TextWrapper 
                check="1"
                textArray={mapData[0].text}
                position={mapData[0].position}/>
        </>
    )
}

export default Map
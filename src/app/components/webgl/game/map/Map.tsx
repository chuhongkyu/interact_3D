import mapData from "@/app/utils/MapData"
import { Oirow } from "../npc/Oirow"
import Spot from "./stage1/Spot"
import TextWrapper from "../TextWrapper"
import { useGameStore } from "@/app/store/useGameStore";
import { useEffect } from "react";

function Map() {
    const setPlayerState  = useGameStore((state) => state.setPlayerState);

    return (
        <>
            <Oirow position={mapData[0].position}/>
            <Spot position={mapData[0].position}/>
            <TextWrapper 
                check="1"
                textArray={mapData[0].text}
                position={mapData[0].position}
                onComplete={()=> setPlayerState("STAGE1")}
            />
        </>
    )
}

export default Map
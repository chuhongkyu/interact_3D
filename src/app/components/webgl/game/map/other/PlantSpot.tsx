import mapData from "@/app/utils/MapData"
import { Plant } from "../../npc/Plant"

function PlantSpot() {
    return (
        <>
            <Plant position={mapData[4].position}/>
        </>
    )
}

export default PlantSpot
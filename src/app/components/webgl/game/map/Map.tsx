import LuigiSpot from "./other/LuigiSpot"
import PlantSpot from "./other/PlantSpot"
import Stage1 from "./stage1/Stage1"
import Stage2 from "./stage2/Stage2"
import Stage3 from "./stage3/Stage3"
import StartSpot from "./start/StartSpot"


function Map() {
    
    return (
        <>
            <StartSpot/>
            <Stage1/>
            <Stage2/>
            <Stage3/>
            <PlantSpot/>
            <LuigiSpot/>
        </>
    )
}

export default Map